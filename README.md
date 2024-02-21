**backend**

イメージをビルド
```
docker compose build
```

データベースの設定（config/database.yml）
```
docker compose up
docker compose exec api rails db:create
```

**frontend**

コンテナをビルドし、コンテナ内に入ります
```
docker compose up --build
docker compose exec front bash
```

コンテナ内でプロジェクトをスタート
```
npm start
```

データベースをmigrate
```
docker compose exec api rails db:migrate
```
