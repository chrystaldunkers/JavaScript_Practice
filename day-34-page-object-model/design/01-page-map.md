# Day 34: four objects, two journeys

LoginPage ---> AccountPage ---> PolicyPage
                  |
                  +----------> QuotePage

LoginPage:  /auth  | Email, Password, Sign in
AccountPage: /account | owned policy, Start a new quote
PolicyPage: /policy/<number> | identifier, Back to My account
QuotePage: / | Driver -> Vehicle -> Coverage

ONE Playwright page per test; several helper objects.
Not four tabs. Not one class for every button.

Story A: sign in -> owned policy -> return to account.
Story B: fresh test -> sign in -> Driver -> Vehicle -> Coverage.
Stop before Save my quote. No purchase or payment.

AccountPage, PolicyPage, QuotePage are Day 35 implementations.
