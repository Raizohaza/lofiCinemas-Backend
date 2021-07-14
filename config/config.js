module.exports={
    "facebook_api_key"      :     "835649640710124",
    "facebook_api_secret"   :     "fde82364ab3039edf5d05c28fab57fcd",
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