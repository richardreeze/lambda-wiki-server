const node_acl = require('acl');

const setupACL = (db) => {
  const acl = new node_acl(new node_acl.mongodbBackend(db, 'acl_'));

  acl.allow([
    {
      roles: 'admin',
      allows: [
        { resources: '/test-secret', permissions: '*' }
      ]
    },
    {
      roles: 'user',
      allows: [
        { resources: ['/profile', '/status'], permissions: '*' }
      ]
    },
    {
      roles: 'guest',
      allows: []
    }
  ]);
  acl.addRoleParents('user', 'guest');
  acl.addRoleParents('admin', 'user');
  acl.addUserRoles('5adf979378e363234cf7aeeb', 'admin');

  return acl;
}

module.exports = setupACL;