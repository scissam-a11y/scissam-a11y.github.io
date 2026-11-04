# Fetch the latest posts from the GeekNews (news.hada.io) feed
# and save them to geeknews-data.js (the page reads it).
# Run: powershell -ExecutionPolicy Bypass -File update-geeknews.ps1

$feed = "https://news.hada.io/rss/news"
$out  = Join-Path $PSScriptRoot "geeknews-data.js"

$res = Invoke-WebRequest $feed -UseBasicParsing -UserAgent "Mozilla/5.0"
$xml = [xml]([Text.Encoding]::UTF8.GetString($res.RawContentStream.ToArray()))

function Get-Text($node) {
  if ($node -is [string]) { return $node }
  return $node.InnerText
}

$items = $xml.feed.entry | Select-Object -First 15 | ForEach-Object {
  # Short teaser only: strip HTML tags and keep the first 110 characters
  $text = (Get-Text $_.content) -replace '<[^>]+>', ' ' -replace '\s+', ' '
  $text = $text.Trim().TrimEnd([char]0x2026)
  if ($text.Length -gt 110) { $text = $text.Substring(0, 110).Trim() + "..." }

  [ordered]@{
    title   = (Get-Text $_.title).Trim()
    link    = ($_.id).ToString()
    date    = ([DateTime]::Parse($_.published)).ToString("yyyy-MM-dd HH:mm")
    summary = $text
  }
}

$data = [ordered]@{
  updated = (Get-Date).ToString("yyyy-MM-dd HH:mm")
  link    = "https://news.hada.io"
  posts   = @($items)
}

$js = "window.GEEKNEWS_DATA = " + ($data | ConvertTo-Json -Depth 4) + ";"
[IO.File]::WriteAllText($out, $js, (New-Object Text.UTF8Encoding $false))
Write-Host "Saved $($items.Count) posts to $out"
