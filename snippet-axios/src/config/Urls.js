export default {
  //auth
  Register: 'register',
  Login: 'login',
  ForgotPassword: 'forgot-password',
  RegeneratePasswordToken: 'regenerate-password-token',
  ResetPassword: 'reset-password',
  VerifyOtp: 'verify-otp',
  UpdateProfile: 'update-profile',
  GetUser: 'get-user',
  RegenerateOTP: 'regenerate-otp',
  GetClub: 'get-club/',
  DeleteAccount: `delete-user/`,

  // Employees
  getEmployeeByDepartment: 'get-employee-by-type',

  //Notifications
  GetNotifications: 'get-notifications',
  MarkReadNotifications: 'mark-read-notifications',
  GetNotificationsCount: 'get-notification-count',

  //Games
  GetGames: 'get-games-by-employee-type/',
  GetQuizQuestions: 'get-games-questions/',
  AddQuizResult: 'add-quiz-result/',
  GetQuizResult: 'get-quiz-result/',
  GetLeaderBoard: 'leader-board',

  //Members
  GetMembers: 'get-members/',
  GetSingleMember: 'get-member/',
  MemberSearch: 'search-member/',
  MemberImageUpload: 'member-image-upload',
  MemberAudioUpload: 'upload-member/audio/',
  GetSportGroupMembers: 'get-sport-filters',

  //Items
  GetItems: 'get-items',
  GetSingleItem: 'get-item/',
  ItemSearch: 'search-item/',
  ItemComment: 'item-comment',
  ItemUploadImage: 'item-image-upload',
  ItemAudioUpload: id => `upload-item/audio/${id}`,

  // Departments
  GetDepartments: 'get-departments',
  ChangeDepartment: 'change-department/',

  //Beo
  GetEventByDate: 'get-events/',
  EventSearch: 'search-events/',
  GetSingleEvent: 'get-event',
  ManageBeoComments: 'beo-event-comment',
  AddBeoImage: 'event-image-upload',

  //Reservations
  GetReservations: 'get-reservations/',

  //ContentInfo
  GetContentInfo: 'get-content-infos-by-employee-type/',
  GetSingleContentInfo: 'get-content-info/',

  //Comments
  GetMemberComments: 'get-comment/',
  AddMemberComment: 'add-comment',
  DeleteComment: 'delete-comment/',
  TranslateComment: 'translate-comment/',

  //Filters
  GetFilters: 'get-filters',
  GetFilterMembers: 'get-filter-members/',
  GetItemFilters: 'get-item-filters',
  GetFilterItems: 'get-filter-items/',

  //Search
  VoiceSearch: 'search-by-text',

  //Send Notification
  sendPushNotification: 'send-push-notification-to-employees',

  //AI Propmpt
  AINotes: 'ai-notes',
};
