# Fetch the latest episodes from the MBC "Son-Kyungje" podcast feed
# and save them to news-data.js (the page reads it).
# Run: powershell -ExecutionPolicy Bypass -File update-news.ps1

$feed = "https://minicast.imbc.com/PodCast/pod.aspx?code=1000671100000100000"
$out  = Join-Path $PSScriptRoot "news-data.js"

$res = Invoke-WebRequest $feed -UseBasicParsing -UserAgent "Mozilla/5.0"
$xml = [xml]([Text.Encoding]::UTF8.GetString($res.RawContentStream.ToArray()))

$items = $xml.rss.channel.item | Select-Object -First 10 | ForEach-Object {
  [ordered]@{
    title       = $_.title
    date        = ([DateTime]::Parse($_.pubDate)).ToString("yyyy-MM-dd HH:mm")
    audio       = $_.enclosure.url
    description = $_.description.InnerText
  }
}

$data = [ordered]@{
  updated  = (Get-Date).ToString("yyyy-MM-dd HH:mm")
  link     = $xml.rss.channel.link
  episodes = @($items)
}

$js = "window.NEWS_DATA = " + ($data | ConvertTo-Json -Depth 4) + ";"
[IO.File]::WriteAllText($out, $js, (New-Object Text.UTF8Encoding $false))
Write-Host "Saved $($items.Count) episodes to $out"
