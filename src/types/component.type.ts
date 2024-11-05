export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface:  Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  OfferServiceInteface: Symbol.for('OfferServiceInteface'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  UserController: Symbol.for('UserController'),
  ExeptionFilterInterface: Symbol.for('ExeptionFilterInterface'),
  OfferController : Symbol.for('OfferController')
} as const;
