import Hook from 'Ractive/prototype/shared/hooks/Hook';
import removeFromArray from 'utils/removeFromArray';

var detachHook = new Hook( 'detach' );

export default function Ractive$detach () {
	if ( this.detached ) {
		return this.detached;
	}

	if ( this.el ) {
		removeFromArray( this.el.__ractive_instances__, this );
	}
	this.detached = this.fragment.detach();
	detachHook.fire( this );
	return this.detached;
}
