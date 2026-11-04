// 기본동사 100: 하루에 하나씩, START 날짜가 Day 1이에요.
// 예문은 책 내용을 옮긴 것이 아니라 직접 만든 것이에요.
// 새 동사는 아래 목록 맨 끝에 같은 모양으로 추가하면 돼요.
window.VERB_DATA = {
  start: "2026-11-04",
  verbs: [
    {
      verb: "get",
      core: "없던 것이 '생기다', 상태가 '되다'",
      headline: "GET, '얻다'만 알면 절반만 아는 거예요",
      examples: [
        { en: "I got your message.", ko: "네 메시지 받았어." },
        { en: "It's getting cold.", ko: "날이 추워지고 있어." },
        { en: "I'll get there by 7.", ko: "7시까지 거기 도착할게." },
      ],
      tip: "get + 장소 = 도착하다, get + 형용사 = ~해지다. '변화'가 느껴지면 get을 떠올려요.",
    },
    {
      verb: "take",
      core: "무언가를 '가져가다', 시간·노력이 '들다'",
      headline: "TAKE, 시간도 버스도 사진도 '가져가요'",
      examples: [
        { en: "It takes 10 minutes.", ko: "10분 걸려." },
        { en: "Let's take a bus.", ko: "버스 타자." },
        { en: "Can you take a photo of us?", ko: "우리 사진 좀 찍어 줄래요?" },
      ],
      tip: "It takes + 시간 = ~만큼 걸리다. 시간을 말할 때 가장 많이 쓰는 표현이에요.",
    },
    {
      verb: "make",
      core: "없던 것을 '만들어 내다', 상태로 '만들다'",
      headline: "MAKE, 결과를 만들어 내는 동사",
      examples: [
        { en: "You made my day!", ko: "덕분에 오늘 하루가 즐거워졌어!" },
        { en: "I made a mistake.", ko: "내가 실수했어." },
        { en: "Don't make me laugh.", ko: "웃기지 마." },
      ],
      tip: "make + 사람 + 동사 = (사람)을 ~하게 만들다. 감정을 말할 때 자주 써요.",
    },
    {
      verb: "have",
      core: "내 곁에 '가지고 있다', 일을 '겪다'",
      headline: "HAVE, 가진 것도 겪은 일도 모두 have",
      examples: [
        { en: "I have a question.", ko: "질문이 하나 있어요." },
        { en: "Have a nice day!", ko: "좋은 하루 보내!" },
        { en: "I had lunch already.", ko: "점심 벌써 먹었어." },
      ],
      tip: "have + 식사 = 먹다. eat보다 자연스럽게 들려요.",
    },
    {
      verb: "give",
      core: "내 쪽에서 상대 쪽으로 '건네다'",
      headline: "GIVE, 물건도 시간도 기회도 건네요",
      examples: [
        { en: "Give me a second.", ko: "잠깐만 기다려 줘." },
        { en: "Give it a try.", ko: "한번 해 봐." },
        { en: "I'll give you a call.", ko: "내가 전화할게." },
      ],
      tip: "give + 사람 + 것 순서를 기억해요. Give me ~ 는 부탁할 때 정말 많이 써요.",
    },
  ],
};
