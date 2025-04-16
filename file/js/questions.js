const questions = [
  {
    question: "1. 정답을 선택하세요.",
    options: { a: "자동차", b: "전화기", c: "냉장고", d: "세탁기" },
    answer: "c",
    explanation: "In Korea, fridge is called 냉장고.",
    image: "file/img/img1.jpg"
  },
  {
    question: "2. 당신의 이름은 뭐 입니까?",
    options: { a: "저는 학생입니다.", b: "제 이름은 깨 시 로선입니다.", c: "집에 갑니다.", d: "안녕하세요." },
    answer: "b",
    explanation: "Question asks 'What is your name?'"
  },
  {
    question: "3. 몇 살 입니까?",
    options: { a: "한 시입니다.", b: "아니요, 저를 몰라요.", c: "소입니다.", d: "스물 살입니다." },
    answer: "d",
    explanation: "Question asks for age: 'How old are you?'"
  },
  {
    question: "4. 듣고 올바른 발음을 고르세요.",
    options: { a: "자기야, 사랑해. 너랑 결혼하고 싶어요.", b: "저는 학교 가고 싶어요", c: "밥을 먹고 싶어요", d: "영화를 보고 싶어요" },
    answer: "a",
    explanation: "Romantic sentence – matches the audio.",
    audio: "audio/audio1.mp3"
  },
  {
    question: "5. 다음 중 직업을 나타내는 것은?",
    options: { a: "학교", b: "선생님", c: "버스", d: "컴퓨터" },
    answer: "b",
    explanation: "선생님 means 'teacher' – it's an occupation."
  },
  {
    question: "6. 다음 단어의 뜻은 무엇입니까?",
    options: { a: "School", b: "Restaurant", c: "Hospital", d: "Market" },
    answer: "c",
    explanation: "병원 means 'hospital' in Korean."
  },
  {
    question: "7. 이 음식의 이름은 무엇입니까?",
    options: { a: "비빔밥", b: "김밥", c: "불고기", d: "떡볶이" },
    answer: "a",
    explanation: "The image shows 비빔밥 – a mixed rice dish.",
    image: "file/img/food1.jpg"
  },
  {
    question: "8. 이 소리는 무엇입니까?",
    options: { a: "전화벨", b: "문 여는 소리", c: "기차", d: "개 짖는 소리" },
    answer: "a",
    explanation: "Audio is a phone ringing.",
    audio: "file/audio/audio2.wav"
  },
  {
    question: "9. 오늘은 무슨 요일입니까?",
    options: { a: "월요일", b: "화요일", c: "수요일", d: "목요일" },
    answer: "a",
    explanation: "월요일 = Monday in Korean."
  },
  {
    question: "10. 이 물건은 어디에 있습니까?",
    options: { a: "책상 위에 있습니다.", b: "학교입니다.", c: "저는 학생입니다.", d: "오후 두 시입니다." },
    answer: "a",
    explanation: "'Where is this object?' – correct answer means 'It's on the desk.'"
  },
  {
    question: "11. 당신은 어디에 갑니까?",
    options: { a: "저는 병원에 갑니다.", b: "저는 학교에 갑니다.", c: "저는 집에 갑니다.", d: "저는 공원에 갑니다." },
    answer: "b",
    explanation: "The question asks 'Where are you going?'"
  },
  {
    question: "12. 나는 무엇을 하고 싶습니까?",
    options: { a: "나는 책을 읽고 싶습니다.", b: "나는 잠을 자고 싶습니다.", c: "나는 음악을 듣고 싶습니다.", d: "나는 학교에 가고 싶습니다." },
    answer: "c",
    explanation: "The question asks 'What do you want to do?'"
  },
  {
    question: "13. 이 사람은 누구입니까?",
    options: { a: "친구입니다.", b: "부모님입니다.", c: "선생님입니다.", d: "직장 동료입니다." },
    answer: "c",
    explanation: "The question asks 'Who is this person?'"
  },
  {
    question: "14. 무엇을 먹고 싶습니까?",
    options: { a: "김밥", b: "떡볶이", c: "불고기", d: "수박" },
    answer: "b",
    explanation: "The question asks 'What do you want to eat?'"
  },
  {
    question: "15. 무엇을 좋아합니까?",
    options: { a: "영화 보기", b: "운동하기", c: "음악 듣기", d: "게임 하기" },
    answer: "a",
    explanation: "The question asks 'What do you like?'"
  },
  {
    question: "16. 어디에서 공부합니까?",
    options: { a: "학교에서 공부합니다.", b: "집에서 공부합니다.", c: "도서관에서 공부합니다.", d: "공원에서 공부합니다." },
    answer: "b",
    explanation: "The question asks 'Where do you study?'"
  },
  {
    question: "17. 지금 몇 시입니까?",
    options: { a: "두 시입니다.", b: "세 시입니다.", c: "네 시입니다.", d: "다섯 시입니다." },
    answer: "a",
    explanation: "The question asks 'What time is it now?'"
  },
  {
    question: "18. 이 사람은 무엇을 하고 있습니까?",
    options: { a: "책을 읽고 있습니다.", b: "춤을 추고 있습니다.", c: "음악을 듣고 있습니다.", d: "운동을 하고 있습니다." },
    answer: "a",
    explanation: "The question asks 'What is this person doing?'"
  },
  {
    question: "19. 당신은 어떤 음식을 좋아합니까?",
    options: { a: "떡볶이를 좋아합니다.", b: "피자를 좋아합니다.", c: "샐러드를 좋아합니다.", d: "파스타를 좋아합니다." },
    answer: "a",
    explanation: "The question asks 'What food do you like?'"
  },
  {
    question: "20. 이 물건은 무엇입니까?",
    options: { a: "책입니다.", b: "컵입니다.", c: "연필입니다.", d: "휴대폰입니다." },
    answer: "d",
    explanation: "The question asks 'What is this object?'"
  },
  {
    question: "21. 당신은 무엇을 마십니까?",
    options: { a: "커피를 마십니다.", b: "차를 마십니다.", c: "물을 마십니다.", d: "주스를 마십니다." },
    answer: "a",
    explanation: "The question asks 'What do you drink?'"
  },
  {
    question: "22. 이 사람은 어디에 있습니까?",
    options: { a: "도서관에 있습니다.", b: "학교에 있습니다.", c: "집에 있습니다.", d: "공원에 있습니다." },
    answer: "b",
    explanation: "The question asks 'Where is this person?'"
  },
  {
    question: "23. 오늘의 날씨는 어떻습니까?",
    options: { a: "맑습니다.", b: "비가 옵니다.", c: "바람이 많이 붑니다.", d: "눈이 옵니다." },
    answer: "a",
    explanation: "The question asks 'What is the weather like today?'"
  },
  {
    question: "24. 당신은 어디에서 왔습니까?",
    options: { a: "서울에서 왔습니다.", b: "부산에서 왔습니다.", c: "대구에서 왔습니다.", d: "인천에서 왔습니다." },
    answer: "a",
    explanation: "The question asks 'Where are you from?'"
  },
  {
    question: "25. 당신의 취미는 무엇입니까?",
    options: { a: "책 읽기", b: "운동", c: "음악 듣기", d: "여행하기" },
    answer: "d",
    explanation: "The question asks 'What is your hobby?'"
  },
  {
    question: "26. 언제 점심을 먹습니까?",
    options: { a: "아침에", b: "점심에", c: "저녁에", d: "밤에" },
    answer: "b",
    explanation: "The question asks 'When do you eat lunch?'"
  },
  {
    question: "27. 이 영화는 무엇에 관한 것입니까?",
    options: { a: "사랑 이야기", b: "모험 이야기", c: "과학 이야기", d: "역사 이야기" },
    answer: "a",
    explanation: "The question asks 'What is this movie about?'"
  },
  {
    question: "28. 무엇을 좋아하지 않습니까?",
    options: { a: "어두운 장소", b: "밝은 장소", c: "편안한 곳", d: "시끄러운 곳" },
    answer: "d",
    explanation: "The question asks 'What do you not like?'"
  },
  {
    question: "29. 이 책의 제목은 무엇입니까?",
    options: { a: "책 제목 A", b: "책 제목 B", c: "책 제목 C", d: "책 제목 D" },
    answer: "a",
    explanation: "The question asks 'What is the title of this book?'"
  },
  {
    question: "30. 이 물건을 사용합니까?",
    options: { a: "네, 사용합니다.", b: "아니요, 사용하지 않습니다.", c: "모르겠습니다.", d: "가끔 사용합니다." },
    answer: "a",
    explanation: "The question asks 'Do you use this item?'"
  },
  {
    question: "31. 어떤 종류의 음악을 좋아합니까?",
    options: { a: "클래식", b: "팝", c: "힙합", d: "재즈" },
    answer: "b",
    explanation: "The question asks 'What type of music do you like?'"
  },
  {
    question: "32. 당신은 어떤 색을 좋아합니까?",
    options: { a: "빨간색", b: "파란색", c: "초록색", d: "노란색" },
    answer: "c",
    explanation: "The question asks 'What color do you like?'"
  },
  {
    question: "33. 이 사람은 무엇을 하고 있습니까?",
    options: { a: "춤을 추고 있습니다.", b: "음악을 듣고 있습니다.", c: "책을 읽고 있습니다.", d: "운동을 하고 있습니다." },
    answer: "c",
    explanation: "The question asks 'What is this person doing?'"
  },
  {
    question: "34. 오늘은 몇 월 며칠입니까?",
    options: { a: "1월 1일", b: "3월 10일", c: "5월 20일", d: "7월 30일" },
    answer: "b",
    explanation: "The question asks 'What is today’s date?'"
  },
  {
    question: "35. 다음 중 가족의 일원이 아닌 사람은 누구입니까?",
    options: { a: "엄마", b: "아빠", c: "선생님", d: "형" },
    answer: "c",
    explanation: "The question asks 'Who is not a family member?'"
  },
  {
    question: "36. 이 음식은 어디에서 왔습니까?",
    options: { a: "중국", b: "일본", c: "한국", d: "미국" },
    answer: "c",
    explanation: "The question asks 'Where is this food from?'"
  },
  {
    question: "37. 이 물건은 무엇으로 만들어졌습니까?",
    options: { a: "나무", b: "플라스틱", c: "금속", d: "유리" },
    answer: "b",
    explanation: "The question asks 'What is this item made of?'"
  },
  {
    question: "38. 이 사람은 어디에 갑니까?",
    options: { a: "병원", b: "도서관", c: "학교", d: "공원" },
    answer: "a",
    explanation: "The question asks 'Where is this person going?'"
  },
  {
    question: "39. 이 영화의 장르는 무엇입니까?",
    options: { a: "공포", b: "로맨스", c: "액션", d: "코미디" },
    answer: "c",
    explanation: "The question asks 'What is the genre of this movie?'"
  },
  {
    question: "40. 이 사람은 어디에 살고 있습니까?",
    options: { a: "서울", b: "부산", c: "대구", d: "인천" },
    answer: "a",
    explanation: "The question asks 'Where does this person live?'"
  }
];