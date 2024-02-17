**backend**

APIモードでRailsプロジェクトを作ります
```
docker compose run api rails new . --force --database=mysql --api
```

イメージをビルド
```
docker compose build
```

データベースの設定（config/database.yml）
```
docker compose up
docker compose exec api rails db:create
```

Gemの設定を変更
```
gem "rack-cors"

docker compose exec api bundle install
```

**frontend**

コンテナをビルドし、コンテナ内に入ります
```
docker compose up --build
docker compose exec front bash
```

プロジェクトを作ります
```
npx create-react-app . --template typescript
```

コンテナ内でプロジェクトをスタート
```
npm start
```

