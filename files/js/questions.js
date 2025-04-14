const questions = [
  {
    question: "이름이 뭐예요?",
    options: ["저는 학생이에요", "저는 한국 사람이에요", "제 이름은 민수예요", "잘 지냈어요"],
    answer: 2,
    explanation: "The question is asking for your name, so the correct answer is '제 이름은 민수예요' (My name is Minsoo)."
  },
  {
    question: "어디에 살아요?",
    options: ["서울에 살아요", "한국 사람이에요", "열심히 공부해요", "학생이에요"],
    answer: 0,
    explanation: "The question is asking where you live, so the correct answer is '서울에 살아요' (I live in Seoul)."
  },
  {
    question: "한국어 공부해요?",
    options: ["아니요, 회사 다녀요", "네, 공부해요", "잘 지냈어요", "한국 음식 좋아해요"],
    answer: 1,
    explanation: "The question is asking if you study Korean, so the correct answer is '네, 공부해요' (Yes, I study)."
  },
  {
    question: "몇 살이에요?",
    options: ["20살이에요", "회사에 다녀요", "공부해요", "안녕하세요"],
    answer: 0,
    explanation: "The question is asking your age, so the correct answer is '20살이에요' (I am 20 years old)."
  },
  {
    question: "무슨 일을 해요?",
    options: ["회사에 다녀요", "학교에 가요", "서울에 살아요", "책을 읽어요"],
    answer: 0,
    explanation: "The question is asking about your job, so '회사에 다녀요' (I work at a company) is the correct answer."
  },
  {
    question: "지금 뭐 해요?",
    options: ["밥을 먹어요", "학교에 가요", "학생이에요", "회사에 다녀요"],
    answer: 0,
    explanation: "The question is asking what you're doing now, so '밥을 먹어요' (I'm eating) is the correct answer."
  },
  {
    question: "가족이 몇 명이에요?",
    options: ["다섯 명이에요", "회사에 다녀요", "서울에 살아요", "공부해요"],
    answer: 0,
    explanation: "The question is asking how many people are in your family, so '다섯 명이에요' (There are five people) is correct."
  },
  {
    question: "취미가 뭐예요?",
    options: ["영화 보기예요", "회사에 다녀요", "열심히 공부해요", "한국어 공부해요"],
    answer: 0,
    explanation: "The question is asking about your hobby, so '영화 보기예요' (Watching movies) is the correct answer."
  },
  {
    question: "주말에 뭐 했어요?",
    options: ["친구를 만났어요", "학교에 가요", "회사에 다녀요", "잘 지냈어요"],
    answer: 0,
    explanation: "The question is about what you did on the weekend, so '친구를 만났어요' (I met a friend) is the correct answer."
  },
  {
    question: "한국 음식 좋아해요?",
    options: ["네, 좋아해요", "아니요, 회사 다녀요", "한국어 공부해요", "안녕하세요"],
    answer: 0,
    explanation: "The question is asking if you like Korean food, so '네, 좋아해요' (Yes, I like it) is the correct answer."
  },

  // Additional 30 questions
  {
    question: "오늘 날씨가 어때요?",
    options: ["맑아요", "공부해요", "회사에 다녀요", "학생이에요"],
    answer: 0,
    explanation: "'오늘 날씨가 어때요?' means 'How is the weather today?', so '맑아요' (It's sunny) is correct."
  },
  {
    question: "생일이 언제예요?",
    options: ["5월 3일이에요", "학교에 가요", "저는 학생이에요", "열심히 공부해요"],
    answer: 0,
    explanation: "The question asks about your birthday, and '5월 3일이에요' (It's May 3rd) is the right answer."
  },
  {
    question: "지금 몇 시예요?",
    options: ["세 시예요", "학교에 가요", "회사에 다녀요", "공부해요"],
    answer: 0,
    explanation: "The question is asking for the current time. '세 시예요' (It's three o'clock) is the correct answer."
  },
  {
    question: "어제 뭐 했어요?",
    options: ["영화를 봤어요", "학교에 가요", "회사에 다녀요", "잘 지냈어요"],
    answer: 0,
    explanation: "The question is about yesterday's activity. '영화를 봤어요' (I watched a movie) is correct."
  },
  {
    question: "어느 나라 사람이에요?",
    options: ["베트남 사람이에요", "열심히 공부해요", "한국어 공부해요", "책을 읽어요"],
    answer: 0,
    explanation: "'어느 나라 사람이에요?' means 'What is your nationality?', so '베트남 사람이에요' (I'm Vietnamese) is correct."
  },
  {
    question: "학교에 어떻게 가요?",
    options: ["버스로 가요", "학교에 다녀요", "한국어 공부해요", "밥을 먹어요"],
    answer: 0,
    explanation: "The question asks how you go to school. '버스로 가요' (I go by bus) is the right answer."
  },
  {
    question: "무슨 음식 좋아해요?",
    options: ["불고기를 좋아해요", "서울에 살아요", "학생이에요", "학교에 가요"],
    answer: 0,
    explanation: "'무슨 음식 좋아해요?' asks what kind of food you like. '불고기를 좋아해요' (I like bulgogi) is correct."
  },
  {
    question: "어디에 가요?",
    options: ["학교에 가요", "밥을 먹어요", "회사에 다녀요", "책을 읽어요"],
    answer: 0,
    explanation: "'어디에 가요?' means 'Where are you going?', so '학교에 가요' (I'm going to school) fits best."
  },
  {
    question: "누구를 만났어요?",
    options: ["친구를 만났어요", "학교에 가요", "학생이에요", "공부해요"],
    answer: 0,
    explanation: "The question is asking who you met. '친구를 만났어요' (I met a friend) is the correct answer."
  },
  {
    question: "어떻게 지내요?",
    options: ["잘 지내요", "밥을 먹어요", "학교에 가요", "회사에 다녀요"],
    answer: 0,
    explanation: "'어떻게 지내요?' means 'How are you?', so '잘 지내요' (I'm doing well) is correct."
  },

  // 20 more continue...
  {
    question: "전화번호가 뭐예요?",
    options: ["010-1234-5678이에요", "서울에 살아요", "회사에 다녀요", "잘 지냈어요"],
    answer: 0,
    explanation: "This asks for your phone number. '010-1234-5678이에요' is the proper response."
  },
  {
    question: "무슨 색을 좋아해요?",
    options: ["파란색을 좋아해요", "책을 읽어요", "회사에 다녀요", "서울에 살아요"],
    answer: 0,
    explanation: "'무슨 색을 좋아해요?' means 'What color do you like?', so '파란색을 좋아해요' (I like blue) is correct."
  },
  {
    question: "집이 어디예요?",
    options: ["서울이에요", "학교에 가요", "밥을 먹어요", "공부해요"],
    answer: 0,
    explanation: "The question asks where your home is. '서울이에요' (It's in Seoul) is correct."
  },
  {
    question: "언제 친구를 만나요?",
    options: ["주말에 만나요", "학교에 가요", "회사에 다녀요", "밥을 먹어요"],
    answer: 0,
    explanation: "'언제 친구를 만나요?' means 'When do you meet your friend?', and '주말에 만나요' (on weekends) is correct."
  },
  {
    question: "몇 시에 자요?",
    options: ["열한 시에 자요", "서울에 살아요", "밥을 먹어요", "학교에 가요"],
    answer: 0,
    explanation: "'몇 시에 자요?' asks 'What time do you sleep?'. '열한 시에 자요' (I sleep at 11) is correct."
  },
  {
    question: "일요일에 뭐 해요?",
    options: ["운동해요", "학교에 가요", "학생이에요", "서울에 살아요"],
    answer: 0,
    explanation: "The question asks what you do on Sunday. '운동해요' (I exercise) is a proper answer."
  },
  {
    question: "얼마예요?",
    options: ["오천 원이에요", "밥을 먹어요", "학교에 가요", "공부해요"],
    answer: 0,
    explanation: "This question asks for a price. '오천 원이에요' (It's 5,000 won) is correct."
  },
  {
    question: "이거 뭐예요?",
    options: ["책이에요", "밥을 먹어요", "공부해요", "학교에 가요"],
    answer: 0,
    explanation: "The question asks 'What is this?'. '책이에요' (It's a book) is the correct answer."
  },
  {
    question: "운동 좋아해요?",
    options: ["네, 좋아해요", "서울에 살아요", "학교에 가요", "공부해요"],
    answer: 0,
    explanation: "'운동 좋아해요?' asks if you like exercise. '네, 좋아해요' (Yes, I do) is the correct answer."
  },
  {
    question: "오늘 뭐 먹었어요?",
    options: ["김밥을 먹었어요", "서울에 살아요", "학교에 가요", "공부해요"],
    answer: 0,
    explanation: "This question asks what you ate today. '김밥을 먹었어요' (I ate kimbap) is correct."
  }
];
