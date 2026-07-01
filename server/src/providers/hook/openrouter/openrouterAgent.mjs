#!/usr/bin/env node

import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

if (!apiKey) {
  console.error('');
  console.error('OPENROUTER_API_KEY가 없습니다.');
  console.error('먼저 아래처럼 입력하세요.');
  console.error('');
  console.error('export OPENROUTER_API_KEY="본인_OpenRouter_API_Key"');
  console.error('');
  process.exit(1);
}

async function askOpenRouter(userMessage) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Title': 'Pixel-Agents-OpenRouter-Assignment',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a simple OpenRouter agent running inside a Pixel Agents assignment prototype.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API 오류: ${response.status}\n${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '응답을 읽지 못했습니다.';
}

const rl = readline.createInterface({ input, output });

console.log('');
console.log('======================================');
console.log(' Pixel Agents OpenRouter Agent Demo');
console.log('======================================');
console.log('');
console.log('질문을 입력하면 OpenRouter 모델이 답합니다.');
console.log('끝내려면 exit 를 입력하세요.');
console.log('');

while (true) {
  const userMessage = await rl.question('나 > ');

  if (userMessage.trim().toLowerCase() === 'exit') {
    console.log('종료합니다.');
    rl.close();
    break;
  }

  try {
    console.log('');
    console.log('OpenRouter 에이전트가 생각 중입니다...');
    console.log('');

    const answer = await askOpenRouter(userMessage);

    console.log('OpenRouter Agent >');
    console.log(answer);
    console.log('');
  } catch (error) {
    console.error('');
    console.error('오류가 발생했습니다.');
    console.error(error.message);
    console.error('');
  }
}
