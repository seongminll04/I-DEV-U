# 🎮I DEV U
**캐릭터🧝‍♂️ 뿐만 아니라 사람의 마음❤️도 움직이는 I DEV U**<br>
**바로가기 : https://i9b206.p.ssafy.io**
<br><br>

### I DEV U 의 소개 UCC

<iframe width="560" height="315" src="https://www.youtube.com/embed/t0qLK7M8DDA" frameborder="0" allowfullscreen></iframe>

목표 : 개발자에게 인적·기술적으로 유용한 커뮤니티를 제공하기 위함

1. 싸피타운

 - 유저간 만남의 장소를 2D 메타버스인 “싸피타운” 으로 구현합니다. 

2. 개발자 동료 찾기

 - 개발자 동료를 찾고 싶은 사람들은 이 플랫폼을 통해 기존에 진행한 설문조사를 기반으로 관심 분야나 기술 스택에 따라 매칭되는 동료를 찾을 수 있습니다. 

3. 개발자 소개팅

 - 이를 통해 관심사와 개성이 맞는 개발자들끼리 만나 친밀감을 형성하고, 좋은 인연으로 이어질 수 있습니다.

4. 프로젝트원 모집

 - 이 플랫폼을 통해 프로젝트에 참여하고 싶은 개발자들을 모집하거나, 자신이 기획한 프로젝트 아이디어를 공유하여 팀을 구성할 수 있습니다.

 <br>

이를 통해 개발자들은 자신의 역량을 발휘하고 동시에 다양한 프로젝트 경험을 쌓을 수 있습니다.

## 📅프로젝트 기간

**23.07.10 ~ 23.08.18 (6주간)**

## 🧝‍♂️팀원 및 역할

| **팀장** | 이형석 (BE,Infra)   |
|----------|---------------------|
| **팀원** | 최범선 (BE,Websocket) |
|          | 박해종 (FE,webRTC)  |
|          | 이진호 (FE,BE)     |
|          | 이성민 (FE,Websocket) |

## 👨‍👩‍👧협업 툴

- GitLab
- Jira
- Notion
- Mattermost
- Webex



## 🛠️주요 기능

<details>
<summary>1. 로그인</summary>

![Alt text](readme사진/image-3.png)
![Alt text](readme사진/image-21.png)
![Alt text](readme사진/image-22.png)
</details></br>

<details>
<summary>2. 소개팅</summary>

![Alt text](readme사진/image-4.png)
![Alt text](readme사진/image-7.png)
![Alt text](readme사진/image-6.png)
</details></br>

<details>
<summary>3. 프로젝트</summary>
![Alt text](readme사진/image-8.png)
![Alt text](readme사진/image-9.png)
![Alt text](readme사진/image-10.png)
![Alt text](readme사진/image-11.png)
</details></br>

<details>
<summary>4. 채팅</summary>
![Alt text](readme사진/image-12.png)
![Alt text](readme사진/image-13.png)
![Alt text](readme사진/image-14.png)
</details></br>

<details>
<summary>5. SSAFY-TOWN</summary>
![Alt text](readme사진/image-15.png)
![Alt text](readme사진/image-20.png)
![Alt text](readme사진/image-16.png)
![Alt text](readme사진/image-17.png)
![Alt text](readme사진/image-18.png)
![Alt text](readme사진/image-19.png)
</details></br>

## 🖥️ 개발 환경

🖱**Backend**

- IntelliJ
- spring boot 2.7.13
- spring-boot-jpa
- Spring Security
- Java 11.0.18
- mysql 8.0.33

🖱**Frontend**

- Visual Studio Code
- React.js 18.2.0
- node.js 18.16.1
- typescript 4.9.5
- phaser 3.60.0
- axios 1.4.0
- formik 2.4.2
- styled-components 6.0.4
- mui material 5.14.2
- stomp 5.1.0

🖱**Web RTC**

- openvidu 2.22.0
- openvidu-basic-node 2.28.0

🖱**CI/CD**

- AWS EC2
- docker
- nginx
- jenkins

## 🔧 서비스 아키텍쳐

![Alt text](readme사진/image-23.png)

## 📑 API 명세서

![Alt text](readme사진/image-2.png)
https://www.notion.so/API-5ac6298a71fa4eb1ab82b7a671afd94d?pvs=4

## ✨ERD

![Alt text](readme사진/image.png)

## 📚 커밋 컨벤션 규칙

| Type 키워드 | 사용 시점 |
| --- | --- |
| 첫 커밋 | CREATE: start project |
| Add | 새로운 파일 추가 |
| Delete | 파일 삭제 |
| Feat | 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정 |
| Fix | 기능에 대한 버그 수정 |
| Build | 빌드 관련 수정 |
| Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| Ci | CI 관련 설정 수정 |
| Docs | 문서(주석) 수정 |
| Style | 코드 스타일, 포맷팅에 대한 수정 |
| Refactor | 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경 |
| Test | 테스트 코드 추가/수정 |
| Release | 버전 릴리즈 |
| Rename | 파일 혹은 폴더명을 수정만 한 경우 |
| Readme | README |
| Comment | 주석관련 |

 ***commit message***
  - commit은 최대한 자세히

`키워드(대문자) :  (영어로 위치/함수/기능) + 설명`

## 🌐EC2 PORT

| 서비스               | 포트  |
|---------------------|-------|
| Spring Boot (BE)    | 9090  |
| React (FE)          | 3000  |
| Openvidu             | 8445  |
| Openvidu (Node)     | 5000  |
| MySQL (DB)          | 3500  |
| Jenkins             | 8080  |


