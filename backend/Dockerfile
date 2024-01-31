# 使用したいRubyのimageを指定
FROM ruby:3.3.0
ARG RUBYGEMS_VERSION=3.5.5

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
  curl \
  apt-transport-https \
  wget \
  && rm -rf /var/lib/apt/lists/*

# yarnパッケージ管理ツールをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y yarn

# Node.jsをインストール
RUN curl -sSL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get update && apt-get install -y nodejs

# 作業ディレクトリを設定
RUN mkdir /api
WORKDIR /api

# Gemをインストール
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock

RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

# アプリケーションのコードをコピー
COPY . /api

# Rails固有のエントリーポイント対応
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]