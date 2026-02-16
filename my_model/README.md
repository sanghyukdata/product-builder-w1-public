# Teachable Machine 모델 파일

이 폴더에 Teachable Machine에서 학습한 모델 파일을 넣어주세요.

## 필요한 파일:
1. `model.json` - 모델 구조 파일
2. `metadata.json` - 모델 메타데이터 (클래스 이름 등)
3. `weights.bin` - 모델 가중치 파일

## 모델 다운로드 방법:

1. [Teachable Machine](https://teachablemachine.withgoogle.com/) 에서 모델을 학습시킵니다
   - Image Project로 프로젝트 생성
   - Class 1: Dog (강아지 이미지들)
   - Class 2: Cat (고양이 이미지들)

2. "Export Model" 버튼을 클릭합니다

3. "Tensorflow.js" 탭을 선택합니다

4. "Download my model" 버튼을 클릭하여 파일을 다운로드합니다

5. 다운로드한 파일들을 이 폴더(`my_model/`)에 복사합니다

## 클래스 이름 설정:
- metadata.json 파일에서 클래스 이름을 다음과 같이 설정하세요:
  - "Dog" 또는 "강아지" - 강아지상
  - "Cat" 또는 "고양이" - 고양이상
