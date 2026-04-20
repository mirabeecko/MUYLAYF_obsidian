---
source: https://help.openai.com/en/articles/8234522-chat-completions-api-system-message-vs-custom-instructions-in-ui
tags: gpt
---
[Vlastní pokyny](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt) v uživatelském rozhraní ChatGPT vám umožní poskytnout návod, jak by se měl model chovat pro konkrétní konverzaci. Je to způsob, jak doladit interakci, aniž byste museli upravovat základní kód nebo model.

V [Rozhraní API pro zpracování chatu](https://platform.openai.com/docs/guides/gpt/chat-completions-api), můžete dosáhnout podobného efektu pomocí systémových zpráv. Systémové zprávy tak mohou být použity k poučení modelu, jak se chovat v konverzaci, jako je přijetí konkrétního tónu nebo dodržování konkrétních pokynů.

Cílem obou technik je poskytnout způsob, jak řídit reakce modelu v konverzaci, ale používají se v různých kontextech (UI pro vlastní pokyny, API pro systémové zprávy). Pokud tedy používáte API, měli byste používat systémové zprávy z rozhraní Chat Completions API.

Jinými slovy, systémové zprávy jsou v našem API, protože vlastní pokyny jsou pro ChatGPT v uživatelském rozhraní a vlastní pokyny nenabízejí další úspory tokenů.


---
---
---
<br>
#### Související články

- [[GPT vs Asistenti]]
- [Co je ChatGPT?](https://help.openai.com/en/articles/6783457-what-is-chatgpt)
- [Využití dat pro spotřebitelské služby FAQ](https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq)
- [Vlastní pokyny pro ChatGPT](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt)
- [ChatGPT Android aplikace - FAQ](https://help.openai.com/en/articles/8142208-chatgpt-android-app-faq)
- [GPT vs Asistenti](https://help.openai.com/en/articles/8673914-gpts-vs-assistants)

#claude_tech
