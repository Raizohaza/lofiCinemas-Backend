module.exports={
    "facebook_api_key"      :     "4202200626565096",
    "facebook_api_secret"   :     "12a584fdb46e33ace3acce3768767d1b",
    "callback_url"          :     "http://localhost:5000/user/auth/facebook/callback",
    "google_clientID"       :     "552583281067-aeqqgkbg4kdutpdfh5venrvanplmhaev.apps.googleusercontent.com",
    "google_clientSecret"   :     "HdJvxpzspQrSj1wXpUJWkC3l",
    "googlecallback_url"    :     "http://localhost:5000/user/auth/google/callback",
    "development": {
        "username": "postgres",
        "password": "1",
        "database": "Cineplex",
        "port": "5432",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      "production": {
        "username": "postgres",
        "password": "1",
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
}