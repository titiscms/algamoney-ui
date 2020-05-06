export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-titis.herokuapp.com',

  tokenWhitelistedDomains: [ /algamoney-api-titis.herokuapp.com/ ],
  tokenBlacklistedRoutes: [ /\/oauth\/token/ ]
};
