# Pixel Agents OpenRouter 과제

## 1. 과제 목표

기존 Pixel Agents는 Claude Code CLI 중심으로 동작한다.

이번 과제에서는 Pixel Agents 프로젝트 안에 OpenRouter API를 호출하는 간단한 에이전트 실행 파일을 추가하였다.

## 2. 추가한 파일

- server/src/providers/hook/openrouter/openrouterAgent.mjs
- OPENROUTER_ASSIGNMENT.md

## 3. 구현 내용

openrouterAgent.mjs 파일은 사용자의 질문을 입력받아 OpenRouter API로 전송하고, OpenRouter 모델의 답변을 터미널에 출력한다.

동작 흐름은 다음과 같다.

사용자 질문 → OpenRouter Agent 실행 파일 → OpenRouter API → 선택한 모델 → 답변 반환 → 터미널 출력

## 4. 실행 방법

아래 명령어로 실행할 수 있다.

export OPENROUTER_API_KEY="본인 API Key"
export OPENROUTER_MODEL="openai/gpt-4o-mini"
node server/src/providers/hook/openrouter/openrouterAgent.mjs

## 5. 실행 결과

아래와 같이 OpenRouter 모델이 정상적으로 응답하는 것을 확인하였다.

질문을 입력하면 OpenRouter 모델이 답합니다.
끝내려면 exit 를 입력하세요.

나 > 너는 누구니?

OpenRouter 에이전트가 생각 중입니다...

OpenRouter Agent >
저는 OpenRouter 에이전트로, 다양한 질문에 답하고 정보를 제공하는 역할을 하고 있습니다.

## 6. 주의사항

OpenRouter API Key는 코드에 직접 넣지 않고 환경변수로만 사용하였다.

API Key는 GitHub에 업로드하지 않는다.

## 7. 현재 한계

이번 구현은 1차 프로토타입이다.

Pixel Agents 전체 UI와 완전히 연결한 단계는 아니며, Pixel Agents 프로젝트 내부에 OpenRouter 모델 호출 에이전트 실행 파일을 추가한 단계이다.
