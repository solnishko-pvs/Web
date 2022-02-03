# Бекенд проекта КупиДевайс

### Стек технологий

- Фреймворк: NestJS
- Среда разработки: WebStorm
- База данных: PostgreSQL

### Запуск

Для успешной работы необходимо создать базу данных и описать подключение к ней.
Она описана в файлах ```.development.env``` и ```.product.env``` .

Далее необходимо прописать 
```bash
$ npm install
```

Возможно npm ругнется на отсутствие cross-env, тогда надо прописать 
```bash
$ npm install --save-dev cross-env
```

Если все прошло успешно, то одна из команд ниже запускает сервер на http://localhost:<номер порта из конфига>
```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

По адресу http://localhost:<номер порта из конфига>/api/v1 вас будет ждать swagger
