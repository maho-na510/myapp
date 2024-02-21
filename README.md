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

プロジェクトを作ります
```
npx create-react-app . --template typescript
```

コンテナ内でプロジェクトをスタート
```
npm start
```

**モデルの作成**

```
docker compose exec api rails g model Todo
```

データベースをmigrate
```
docker compose exec api rails db:migrate
```

**コントローラの作成**

```
docker compose exec api rails g controller api/v1/todos
```
**フロントのライブラリをインストール**

```
docker compose exec front npm install axios @chakra-ui/react @emotion/react @emotion/styled framer-motion @chakra-ui/icons
```
