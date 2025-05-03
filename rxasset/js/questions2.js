const questions = [
  {
    question: " 이 사진 뭐의 입니까 ?",
    options: { a: "자동차 입니다.", b: "전화기 입니다.", c: "냉장고 입니다.", d: "세탁기 입니다." },
    answer: "c",
    explanation: "In Korea, fridge is called 냉장고.",
    image: "rxasset/img/img/img1.jpg"
  },
  {
    question: " 당신의 이름은 뭐 입니까?",
    options: { a: "저는 학생입니다.", b: "깨 시 로선 입니다.", c: "집에 갑니다.", d: "안녕하세요." },
    answer: "b",
    explanation: "Question asks 'What is your name?'"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "자기야, 사랑해. 너랑 결혼하고 싶어요.", b: "저는 학교 가고 싶어요", c: "밥을 먹고 싶어요", d: "영화를 보고 싶어요" },
    answer: "a",
    explanation: "Romantic sentence – matches the audio.",
    audio: "rxasset/img/audio/audio1.mp3"
  },
  {
    question: " 이 사진은 뭐의 입니까?",
    options: { a: "돈 입니다.", b: "원 입나다.", c: "물소 입니다.", d: "소 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img2.jpg"
  },
  {
    question: "이 사진은 뭐의 입니까?",
    options: { a: "짐대 입니다.", b: "텔레비전 입니다.", c: "노트북 입니다.", d: "컴프터 입니다" },
    answer: "d",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img14.jpg"
  },
  {
    question: " 저는 어제 시장에 가서 두 ...... 바지를 샀습니다.",
    options: { a: "개", b: "벌", c: "송이", d: "켤레" },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: " 이 사진은 뭐의 입니까?",
    options: { a: "이 사진은 학교의 사진입니다.", b: "이 사진은 병원의 사진입니다.", c: "이 사진은 공원의 사진입니다.", d: "이 사진은 경찰서의 사진입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img21.jpg"
  },
  {
    question: " 이 소리는 무엇입니까?",
    options: { a: "전화벨", b: "문 여는 소리", c: "기차", d: "개 짖는 소리" },
    answer: "a",
    explanation: "Audio is a phone ringing.",
    audio: "rxasset/img/audio/audio2.wav"
  },
  {
    question: "  이 사진은 뭐의 입니까?",
    options: { a: "버스 입니다.", b: "기차 입니다.", c: "택시 입니다.", d: "차 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img15.jpg"
  },
  {
    question: "  이 사진은 뭐의 입니까?",
    options: { a: "소 입니다.", b: "모자 입니다", c: "바지 입니다.", d: "사자 입니다." },
    answer: "b",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img3.jpg"
  },
  {
    question: " 선픙기가 두 ....... 있습니다.",
    options: { a: "대", b: "개", c: "채", d: "켤레" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: " 저는 어제 시장에 갔어요, ...... 에서 과일을 샀어요.",
    options: { a: "여기", b: "커기", c: "저기", d: "어디" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: " 이 사진은 뭐의 입니까?",
    options: { a: "모자 입니다.", b: "유니픔 입니다.", c: "바지 입니다.", d: "가방 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img4.jpg"
  },
  {
    question: " 가：내일 ....이/가 어때요?<br>나：비가 오고 바람이 많이 불 거예요.",
    options: { a: "시간", b: "날씨", c: "날짜", d: "계절" },
    answer: "b",
    explanation: "Review not Aviable."
  },
  {
    question: " 100000",
    options: { a: "십만", b: "천만", c: "만", d: "조" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: " 이 사진은 뭐의 입니까?",
    options: { a: "공항 입니다.", b: "자전거 입니다.", c: "배 입니다.", d: "비행기 입니다." },
    answer: "d",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img5.jpg"
  },
  {
    question: " 만오천백오십일",
    options: { a: "151515", b: "10500", c: "15151", d: "15235" },
    answer: "c",
    explanation: "Review not Aviable."
  },
  {
    question: " 지금 일요일 입니다, 모레 ..... 입니다.",
    options: { a: "화요일 입니다.", b: "월요일 입니다.", c: "토요일 입니다.", d: "목요일 입니다." },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: " 이 사진은 뭐의 입니까?",
    options: { a: "선픙기 입니다.", b: "자동차 입니다.", c: "버스 입니다.", d: "차 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/img/img/img6.jpg"
  },
  {
    question: " 여기에서 제 집까지 ..... 입니다.",
    options: { a: "세 길로미터 거리", b: "삼 길로미터", c: "세 길로미터", d: "삼 길로미터 거리" },
    answer: "d",
    explanation: "Review not Aviable.'"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신의 여동생이 이름은 뭐 입니까 ?", b: " 단신의 여동생 있어요 ?", c: "제 여동생 열다섯 살 입니다.", d: "오늘 여동생랑 사장 갑니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio1.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio2.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio3.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio4.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio5.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio6.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio7.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio8.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio9.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio10.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio11.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio12.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio13.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio14.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio15.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio16.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "안녕하세요", b: "감사합니다", c: "네", d: "안녕하십니까" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio17.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio18.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a:"", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio19.mp3"
  },
  {
    question: "듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/audio/QSM2/audio20.mp3"
  },
];