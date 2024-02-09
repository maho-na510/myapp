module TokenHelper
    SECRET_KEY = Rails.application.credentials.secret_key_base
  
    def encode_token(payload)
      JWT.encode(payload, SECRET_KEY)
    end
  
    def decode_token(token)
      JWT.decode(token, SECRET_KEY).first
    end
  end
  