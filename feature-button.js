export class FeatureButton extends Element {
	onClick;
	module;
	onMouseEnter;
	onMouseLeave;
	videoSrc;
	status;
	grayscale;
	initialized = false;

	constructor(props) {
		super();

		//console.warn('FeatureButton constructor');
		this.onClick = props.onClick;
		this.module = props.module;
		this.onMouseEnter = props.onMouseEnter;
		this.onMouseLeave = props.onMouseLeave;
		this.videoSrc = props.video;
		this.status = 'stopped';
		this.grayscale = props.grayscale;
	}

	onstart() {
		// console.warn('FeatureButton onstart');
		if (!this.initialized && this.video) {
			this.initialized = true;
			this.video.audioVolume = 0;

			this.video.position = 0;
			this.video.stop();
		}
	}

	playVideoPreview() {
		// console.warn('FeatureButton playVideoPreview');

		if (this.video) {
			this.video.position = 0;
			this.video.play();
			//this.componentUpdate({ status: "playing" });
		}
	}

	stopVideoPreview() {
		//console.warn('FeatureButton stopVideoPreview');

		if (this.video) {
			this.video.position = 0;
			this.video.stop();
			//this.componentUpdate({ status: "stopped" });
		}
	}

	['on video-start at video'](e, video) {
	 	this.onstart?.(); // call if it is defined
	}

    ['on mouse-over at video'](e, video) {
	 	this.playVideoPreview?.(); // call if it is defined
	}
	
	['on mouse-out at video'](e, video) {
	 	this.stopVideoPreview?.(); // ditto
	}

	render(props) {
		//console.warn('FeatureButton render');

		return (
			<button
				onClick={this.onClick}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				class='feature-button'
				module={this.module}
				description={props.description}
				// inAppTrackingName={this.module}
			>
				<video
					class='video'
					src={this.videoSrc}
					type='video/wmv'
					mode={this.status}
					grayscale={props.grayscale}
					onstart={this.onstart.bind(this)}
					onMouseEnter={this.playVideoPreview.bind(this)}
					onMouseLeave={this.stopVideoPreview.bind(this)}>
					<div class='cover'></div>
					<div class='bar'>{props.text}</div>
				</video>

				<div class='marker'>AI</div>
				<div class='bottom-marker' />
			</button>
		);
	}
}
