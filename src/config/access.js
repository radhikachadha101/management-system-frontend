import { getAbility } from './ability';
const access = (action, data) => {
	const ability = getAbility();
	const canAccess = ability.can(action, data);
	return canAccess;
};
export default access;
