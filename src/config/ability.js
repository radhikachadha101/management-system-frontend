//ability.js
import { Ability, AbilityBuilder } from "@casl/ability";
import store from './store';
import { decode } from 'jsonwebtoken'
const rolesAccess = {
  Common: [{
    action: "manage", 
    subject: "Common"
  }],
  ADMIN: [
    {
      action: "manage",
      subject: "all"
    }
  ],
  BDMANAGER:[{
    action: ['read', 'write', 'update', 'remove'],
    subject: ["Proposal",'Skills','bidProfiles','stats']
  }],
  BDTRAINEE:[{
    action: ['read'],
    subject: ['Proposal','stats']
  }],
  Dev: [
    {
      action: ['read', 'write', 'update', 'remove'],
      subject: ['Timesheet']
    },
  ],
  Manager: [
    {
      action: ['read', 'write', 'update', 'remove'],
      subject: ['Timesheet']
    },
    {
      action: 'read',
      subject: ['Reports']
    }
  ]
}
export function getAbility() {
  const { can, rules } = new AbilityBuilder();
  const { AppReducer: { token: authToken } } = store.getState();
  const token = authToken || localStorage.getItem('authToken');
  const roles = ['Common'];
  if(token) {
    const { user : { userGroup } } = decode(token);
    if(userGroup) {
      roles.push(userGroup);
    }
  } 
  roles.forEach(currentRole => {
    if(currentRole == 'BD MANAGER'){
      currentRole = 'BDMANAGER'
    }
    if(currentRole == 'BD TRAINEE'){
      currentRole = 'BDTRAINEE'
    }

    
    const permissions = rolesAccess[currentRole];
    if(permissions && permissions.length) {
      permissions.forEach(permission => {
        can(permission.action, permission.subject);
      })
    } 
  })
  return new Ability(rules);
}
