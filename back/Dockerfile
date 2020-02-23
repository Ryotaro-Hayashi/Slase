FROM ruby:2.6.5

RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /back

ENV BACK_PORT /back
WORKDIR $BACK_PORT

ADD ./Gemfile $BACK_PORT/Gemfile
ADD ./Gemfile.lock $BACK_PORT/Gemfile.lock

RUN gem install bundler
RUN bundle install
ADD . $BACK_PORT
