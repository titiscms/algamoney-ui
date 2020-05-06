export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-titis.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-api-titis.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
