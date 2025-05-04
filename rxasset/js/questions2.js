const questions = [
  {
    question: "1<br> 이 사진 뭐의 입니까 ?",
    options: { a: "자동차 입니다.", b: "전화기 입니다.", c: "냉장고 입니다.", d: "세탁기 입니다." },
    answer: "c",
    explanation: "In Korea, fridge is called 냉장고.",
    image: "rxasset/QSM2/img/img1.jpg"
  },
  {
    question: "2<br>  당신의 이름은 뭐 입니까?",
    options: { a: "저는 학생입니다.", b: "깨 시 로선 입니다.", c: "집에 갑니다.", d: "안녕하세요." },
    answer: "b",
    explanation: "Question asks 'What is your name?'"
  },
  {
    question: "3<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "자기야, 사랑해. 너랑 결혼하고 싶어요.", b: "저는 학교 가고 싶어요", c: "밥을 먹고 싶어요", d: "영화를 보고 싶어요" },
    answer: "a",
    explanation: "Romantic sentence – matches the audio.",
    audio: "rxasset/QSM2/audio/audio1.mp3"
  },
  {
    question: "4<br>  이 사진은 뭐의 입니까?",
    options: { a: "돈 입니다.", b: "원 입나다.", c: "물소 입니다.", d: "소 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img2.jpg"
  },
  {
    question: "5<br> 이 사진은 뭐의 입니까?",
    options: { a: "짐대 입니다.", b: "텔레비전 입니다.", c: "노트북 입니다.", d: "컴프터 입니다" },
    answer: "d",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img14.jpg"
  },
  {
    question: " 6<br> 저는 어제 시장에 가서 두 ...... 바지를 샀습니다.",
    options: { a: "개", b: "벌", c: "송이", d: "켤레" },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: "7<br>  이 사진은 뭐의 입니까?",
    options: { a: "이 사진은 학교의 사진입니다.", b: "이 사진은 병원의 사진입니다.", c: "이 사진은 공원의 사진입니다.", d: "이 사진은 경찰서의 사진입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img21.jpg"
  },
  {
    question: "8<br>  이 소리는 무엇입니까?",
    options: { a: "전화벨", b: "문 여는 소리", c: "기차", d: "개 짖는 소리" },
    answer: "a",
    explanation: "Audio is a phone ringing.",
    audio: "rxasset/QSM2/audio/audio2.mp3"
  },
  {
    question: "9<br>   이 사진은 뭐의 입니까?",
    options: { a: "버스 입니다.", b: "기차 입니다.", c: "택시 입니다.", d: "차 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img15.jpg"
  },
  {
    question: "10<br>   이 사진은 뭐의 입니까?",
    options: { a: "소 입니다.", b: "모자 입니다", c: "바지 입니다.", d: "사자 입니다." },
    answer: "b",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img3.jpg"
  },
  {
    question: "11<br>  선픙기가 두 ....... 있습니다.",
    options: { a: "대", b: "개", c: "채", d: "켤레" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: "12<br>  저는 어제 시장에 갔어요, ...... 에서 과일을 샀어요.",
    options: { a: "여기", b: "커기", c: "저기", d: "어디" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: "13<br>  이 사진은 뭐의 입니까?",
    options: { a: "모자 입니다.", b: "유니픔 입니다.", c: "바지 입니다.", d: "가방 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img4.jpg"
  },
  {
    question: "14<br>  가：내일 ....이/가 어때요?<br>나：비가 오고 바람이 많이 불 거예요.",
    options: { a: "시간", b: "날씨", c: "날짜", d: "계절" },
    answer: "b",
    explanation: "Review not Aviable."
  },
  {
    question: "15<br>  100000",
    options: { a: "십만", b: "천만", c: "만", d: "조" },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: "16<br>  이 사진은 뭐의 입니까?",
    options: { a: "공항 입니다.", b: "자전거 입니다.", c: "배 입니다.", d: "비행기 입니다." },
    answer: "d",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img5.jpg"
  },
  {
    question: "17<br>  만오천백오십일",
    options: { a: "151515", b: "10500", c: "15151", d: "15235" },
    answer: "c",
    explanation: "Review not Aviable."
  },
  {
    question: "18<br>  지금 일요일 입니다, 모레 ..... 입니다.",
    options: { a: "화요일 입니다.", b: "월요일 입니다.", c: "토요일 입니다.", d: "목요일 입니다." },
    answer: "a",
    explanation: "Review not Aviable."
  },
  {
    question: "19<br>  이 사진은 뭐의 입니까?",
    options: { a: "선픙기 입니다.", b: "자동차 입니다.", c: "버스 입니다.", d: "차 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    image: "rxasset/QSM2/img/img6.jpg"
  },
  {
    question: "20<br>  여기에서 제 집까지 ..... 입니다.",
    options: { a: "세 길로미터 거리", b: "삼 길로미터", c: "세 길로미터", d: "삼 길로미터 거리" },
    answer: "d",
    explanation: "Review not Aviable.'"
  },
  {
    question: "21<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신의 여동생이 이름은 뭐 입니까 ?", b: " 단신의 여동생 있어요 ?", c: "제 여동생 열다섯 살 입니다.", d: "오늘 여동생랑 시장 갑니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio1.mp3"
  },
  {
    question: "22<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "이 지갑의 다섯 원 입니다 .", b: "이 양말 오백 원 입니다 .", c: "이 모자 오백 원 입니다 .", d: "이 지갑의 오백 원 입니다 ." },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio2.mp3"
  },
  {
    question: "23<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "이 가방은 소의 입니다.", b: "이 가방 제는 입니다.", c: "이 소 제는 입니다.", d: "이 가방 없어요." },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio3.mp3"
  },
  {
    question: "24<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "제  이름은 깨 시 로선 입니다 .", b: "제 남동생 이름은 깨 시 로선 입니다 .", c: "제 친구 이름은 깨 시 로선 입니다 .", d: "제 아버지 이름은 깨 시 로선 입니다 ." },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio4.mp3"
  },
  {
    question: "25<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신이 음식을 요리해요.", b: "저는 뭐 해요 ?", c: "당신 어디 갑니까 ?", d: "아이구 ,뭐 일어나요 ." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio5.mp3"
  },
  {
    question: "26<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신을 물소 고기를 먹고 좋아요 ?", b: "당신을 고기를 먹고 좋아요 ?", c: "저는 고기를 먹고 싶어요.", d: "이 고기는 뭣은 입니까 ?" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio6.mp3"
  },
  {
    question: "27<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신은 집에 갑니까 ?", b: "당신에 이름은 뭐 입니까 ?", c: "어디 갑니까 ?", d: "당신의 집 어디로 있습니까 ?" },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio7.mp3"
  },
  {
    question: "28<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "내일 갑니다.", b: "당신이 오늘 뭣은 먹습니까 ?", c: "식당에 먹습나다.", d: "닥 고기를 먹습니다." },
    answer: " b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio8.mp3"
  },
  {
    question: "29<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "물소 입니까 ?", b: "비행기 입니다.", c: "제 친구 입니다 .", d: "소 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio9.mp3"
  },
  {
    question: "30<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "아이구 이 사람은 않이 바배 있어요 .", b: "아이구 이 사람은 않이 소 있어요 .", c: "아이구 이 사람은 바배 있어요 .", d: "아이구  사람은 않이  있어요 ." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio10.mp3"
  },
  {
    question: "31<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "그 사람은 누구 밉니까 ?", b: "남동생 입니다.", c: "여동생 입니다 .", d: "당신의 남동생 있습니까 ?" },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio11.mp3"
  },
  {
    question: "32<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "집에 가 .", b: "저는 뭣은 해요 ?", c: "빨리 하라.", d: "뭐 입니까 ?" },
    answer: " b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio12.mp3"
  },
  {
    question: "33<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "뭐 해요 ?", b: "왜 가요 ?", c: "당신 뭣은 싶어요 ?", d: "집에 갑니까 ?" },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio13.mp3"
  },
  {
    question: "34<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "깨 시 로선 입니다 .", b: "친구 입니다.", c: "학생 입니다 .", d: "선생님 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio14.mp3"
  },
  {
    question: "35<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "내일 비가 와을거예요.", b: "저는 싶어요.", c: " 여자 많이 예쁘어요.", d: "날시 많이 좋아요." },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio15.mp3"
  },
  {
    question: "36<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "아녕하세요 .", b: "안녕하세요 , 저는 집에 갑니다 .", c: "몰라요 .", d: "어디 갑니까 ?" },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio16.mp3"
  },
  {
    question: "37<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "안녕하세요", b: "감사합니다", c: "네", d: "안녕하십니까" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio17.mp3"
  },
  {
    question: "38<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio18.mp3"
  },
  {
    question: "39<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a:"", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio19.mp3"
  },
  {
    question: "40<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "", b: "", c: "", d: "" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio20.mp3"
  },
];