<img src='https://i8a304.p.ssafy.io/static/media/logoMain.f4f1b7e0f25882579452.png'>

# <center>🏃‍♂️ Marathon 🏃‍♀️</center>

 ![Github](https://img.shields.io/badge/react-18.2.0-%234FC08D?style=plastic&logo=React)![Github](https://img.shields.io/badge/spring_boot-2.5.6-%236DB33F?style=plastic&logo=Spring)![Github](https://img.shields.io/badge/MySQL-8.0.31-%234479A1?style=plastic&logo=mysql)![Github](https://img.shields.io/badge/build-passing-brightgreen?style=plastic)




`Marathon` 는 누구나 합리적인 비용으로 언어치료 기회를 누릴 수 있도록
의사소통 전문가를 온라인으로 연결하는 원격 언어 재활 서비스입니다. 

1. Patient Service
   - 비회원, 회원 모두 무료상담신청이 가능합니다.
   - 원하는 재활사를 선택하고 원하는 시간에 재활시간을 등록합니다.
   - 재활시간이 되면 알림으로 접속가능한 링크를 안내합니다.
   - 재활이 매칭된 재활사에게 메세지를 보낼 수 있습니다. 
2. Doctor Service
   - 재활사는 재활치료가 가능한 시간을 등록할 수 있습니다.
   - 재활이 매칭된 환자에게 메세지를 보낼 수 있습니다. 
3. Adimin Service
   - 관리자는 공지사항을 등록, 수정, 삭제합니다. 

[여기](https://i8a304.p.ssafy.io)를 클릭해 사이트를 확인하세요 😀





## 📌 목차

[🏃‍♂️ Marathon 🏃‍♀️](#marathon)  

   - [시작하기](#-시작하기)
     - [시작하기에 앞서](#시작하기에-앞서)
     - [설치하기](#설치하기)
     - [실행하기](#실행하기)
     - [배포하기](#배포하기)
     - [데모](#데모)
- [지원하는 브라우저](#-지원하는-브라우저)
- [사용된 도구](#-사용된-도구)
- [사용된 기술](#-사용된-기술)
- [저자](#-저자)
- [라이센스](#-라이센스)
- [참고](#-참고)



## 🏃 시작하기

아래 방법을 따르시면 프로젝트를 실행시킬 수 있습니다.

### 시작하기에 앞서

* [Windows 10](https://www.microsoft.com/en-us/software-download/windows10)
* [JDK 1.8](https://www.oracle.com/kr/java/technologies/javase/javase-jdk8-downloads.html)
* [Node.js 12.8.1](https://nodejs.org/ko/download/)
* [MySQL 8.0](https://www.mysql.com/downloads/)

### 설치하기

1. 깃랩의 레포지토리를 클론합니다.

   ```
   $ git clone https://github.com/YongjoonSeo/1st_pjt_301.git
   ```

2. npm을 설치합니다.

   ```
   $ npm install
   ```

### 실행하기

`Marathon` 서비스를 사용하기 위해서는 다음과 같은 방법으로 실행합니다:

1. 데이터베이스를 설정합니다.

   - [marathon.sql](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A304/-/blob/dev/Docs/marathon.sql)을 참고해서 데이터베이스를 생성합니다. ([여기](https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A304/-/blob/dev/Docs/marathon_ERD.png)를 눌러 erd를 확인하세요.)

   - `application.properties`에 데이터베이스 설정을 추가합니다.

     ```
     spring:
       datasource:
         driver-class-name: com.mysql.cj.jdbc.Driver
         url : jdbc:mysql://localhost:3306/marathon?characterEncoding=UTF-8&serverTimezone=Asia/Seoul
         username : {데이터베이스 계정 아이디}
         password : {데이터베이스 계정 비밀번호}
     ```

2. 백엔드 서버를 실행합니다.

   - IDE에 import 후 실행합니다.

     : IntelliJ, STS와 같은 IDE를 사용하는 경우, `backend`를 import하여 실행합니다.

   - jar파일을 생성 후 실행합니다.

     ```
     $ gradlew -DskipTests=true build
     ```

     ```
     $ java -jar [filename].jar
     ```

3. 프론트엔드를 실행합니다.

   ```
   $ npm start
   ```

### 배포하기

해당 서비스는 `AWS EC2`를 이용하여 배포하였습니다. 사전에 [여기](https://victorydntmd.tistory.com/61)를 참고해서 `AWS EC2`계정을 생성하세요.

배포를 하기위해서는 다음과 같은 방법으로 실행합니다:

1. AWS EC2 인스턴스 생성
2. JDK 설치 (환경변수 설정)
3. DB 설치 (해당 프로젝트에서 MySQL 사용)
4. gradle wrapper을 위한 버전 설정 (6.0.0 이상)
5. gradle clean build 실행 (war 파일 생성)
6. npm build (dist 폴더 생성)
7. Nginx (front-end, back-end 경로 설정)

### 데모

[여기](https://i8a304.p.ssafy.io)를 클릭하세요.



## 🌐 지원하는 브라우저

| <img src='https://user-images.githubusercontent.com/19357410/91040268-e27b8100-e648-11ea-9dfa-21123112fd23.png' width=60> | <img src='https://user-images.githubusercontent.com/19357410/91040279-e7403500-e648-11ea-8b38-07049ca300af.png' width=60> | <img src='https://user-images.githubusercontent.com/19357410/91040276-e6a79e80-e648-11ea-8c97-ddc1d35d761c.png' width=60> | <img src='https://user-images.githubusercontent.com/19357410/91040282-e7403500-e648-11ea-9f42-d8abd35e9b50.png' width=60> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|                            latest                            |                            latest                            |                            latest                            |                            latest                            |



## 🛠️ ​사용된 도구

* React 18.2.0
* Node 18.12.1 LTS
* Npm 8.19.2
* Spring boot 2.5.6
* Gradle 6.4.1
* IDE: Visual Studio Code 1.48, IntelliJ IDEA 2022.3.1



## 🖥️ ​사용된 기술

<img src="https://d1v10kml6l14kq.cloudfront.net/spec.png" width=850>

#### 프론트엔드

| Technology          | Description                                                  | Official website                                  |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| Vue                 | Front-end framework                                          | https://vuejs.org/                                |
| Vue-router          | Routing library                                              | https://router.vuejs.org/                         |
| Vuex                | Global State Management library                              | https://vuex.vuejs.org/                           |
| vuex-persistedstate | Persist and rehydrate your Vuex state between page reloads   | https://www.npmjs.com/package/vuex-persistedstate |
| Axios               | HTTP communication library                                   | https://github.com/axios/axios                    |
| Vuetify             | Vue UI library                                               | https://vuetifyjs.com/                            |
| vue-cookies         | A simple Vue.js plugin for handling browser cookies          | https://www.npmjs.com/package/vue-cookies         |
| vue-chartjs         | Wrapper for Chart.js in vue                                  | https://vue-chartjs.org/                          |
| vue-cropperjs       | A Vue wrapper component for [cropperjs](https://github.com/fengyuanchen/cropperjs) | https://www.npmjs.com/package/vue-cropperjs       |
| sweetalert          | A beautiful replacement for messages                         | https://sweetalert.js.org/guides/                 |
| vue-google-oauth2   | Handling Google sign-in and sign-out for Vue.js applications | https://www.npmjs.com/package/vue-google-oauth2   |

#### 백엔드

| Technology      | Dscription                       | Official Website                           |
| --------------- | -------------------------------- | ------------------------------------------ |
| Spring Boot     | Container + MVC framework        | https://spring.io/projects/spring-boot     |
| Spring Security | Authentication and authorization | https://spring.io/projects/spring-security |
| Redis           | Distributed cache                | https://redis.io/                          |
| JWT             | JWT login support                | https://jwt.io/                            |
| MySQL           | RDBMS                            | https://www.mysql.com/                     |
| JPA             | ORM framework                    | https://spring.io/projects/spring-data-jpa |
| QueryDsl        | Java persistence query language  | http://www.querydsl.com/                   |
| Lombok          | Simplified object packaging tool | https://projectlombok.org/                 |
| OAuth           | Authentication and authorization | https://oauth.net/                         |
| Swagger-UI      | Document production tool         | https://github.com/swagger-api/swagger-ui  |

* Spring security와 JWT(JSON Web Token)를 이용해 사용자 인증 및 인가 과정을 거쳐 웹 어플리케이션의 보안을 구성하였습니다.
* 로그인한 사용자의 인증 토큰을 인-메모리 데이터 저장소인 Redis에 저장하여 로그인 및 로그아웃한 사용자를 관리하였습니다.
* 인증 프로토콜 중 하나인 OAuth2(Open Authorization) 를 통해 구글 소셜 로그인을 구현하였습니다.
* JPA(Java Persistence API) + Spring Data JPA 를 사용하여 객체들과 테이블, 레코드를 자동으로 관리하며 기본적인 쿼리를 자동으로 생성합니다.
* QueryDSL을 이용해 타입에 안전한 방식으로 동적 쿼리를 생성해 SQL문을 문자열로 작성하거나 XML파일에 작성하지 않고  코드로 작성합니다.
* 사용자의 성별과 연령대를 기반으로 피드 게시, 피드 좋아요, 피드 상세 조회, 검색 로그 데이터를 분석해 추천 서비스를 제공합니다.
* AWS EC2와 Nginx를 이용하여 서비스를 배포하였습니다.

#### 추후 적용

* 추가로 docker를 사용하여 배포할 예정입니다.



## 📼 시연 영상

* [시연 영상](https://youtu.be/yDo78va-JFI)
* 로그인, 피드, 댓글, 좋아요, 팔로우, 알림 서비스
  * <img src="https://user-images.githubusercontent.com/19357410/91041095-62eeb180-e64a-11ea-9614-ec12760ad28b.gif" width=350>
  



## 👤 저자

* 김동연 - Sehoon Kim - kimsae123@naver.com
* 김정수 - jumgsu Kim - kjskjs356@gmail.com
* 윤호산 - Hosan Yoon - yoonhosan@naver.com
* 이연학 - Sunsoo Lee - tjstn921030@gmail.com
* 조웅희 - Yongjoon Seo - koreakkrea12@naver.com
* 최준아 - Yongjoon Seo - koreakkrea12@naver.com



## 📃 라이센스

```
Copyright (c) 2015 Juns Alen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```



## 📚  참고

* https://gist.github.com/taeukme/e004e01963190615d308a16bcd6e6040

* https://github.com/naver/egjs-flicking
