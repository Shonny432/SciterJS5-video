import { FeatureButton } from './feature-button';

function createFeatureButtonsTexts() {
	return [
		{
			text: 'Remove Background',
			description: 'Remove a photo background and choose a new one',
		},
		{
			text: 'Replace Sky',
			description: 'Remove the sky from your photo and choose a new one',
		},
		{
			text: 'Erase Objects',
			description: 'Erase unwanted objects or people from your photo',
		},
		{
			text: 'Make Photomontage',
			description: 'Design a montage using photos, custom text, images and more',
		},
		{
			text: 'Edit Photo',
			description: 'Crop, correct and enhance your photos and add creative effects',
		},
	];
}

export class HomeFeatures extends Element {
	constructor(props) {
		super();
		console.log('HomeFeatures constuctor');

		//const folder = 'file://' + Application.mainExeFolder;
		const texts = createFeatureButtonsTexts();
		this.featureButtonsInfo = [
			{
				text: texts[0].text,
				description: texts[0].description,
				module: 'background',
				video: 'video/remove-background.wmv',
				grayscale: false,
			},
			{
				text: texts[1].text,
				description: texts[1].description,
				module: 'sky',
				video: 'video/replace-sky.wmv',
				grayscale: false,
			},
			{
				text: texts[2].text,
				description: texts[2].description,
				module: 'erase',
				video: 'video/erase-object.wmv',
				grayscale: false,
			},
			{
				text: texts[3].text,
				description: texts[3].description,
				module: 'photomontage',
				video: 'video/photomontage.wmv',
				grayscale: false,
			},
			{
				text: texts[4].text,
				description: texts[4].description,
				module: 'edit',
				video: 'video/edit-photo.wmv',
				grayscale: false,
			},
		];
	}


	componentWillUnmount() {
		console.log('HomeFeatures componentWillUnmount');
	}

	showTextDescription(evt, el) {
		const description = el.$p('button').getAttribute('description');
		if (description && this.currentDescription != description) 
			this.componentUpdate({ currentDescription: description });
	}

	hideTextDescription = () => {
		if (this.currentDescription != undefined)
			this.componentUpdate({ currentDescription: undefined });
	};

	async onClickFeature(evt, el) {
		ShowAccountMenu(false);
		ModuleChecker.checkIsModuleInstalled(el);

		let panelToOpen = el.getAttribute('module');
		let path = selectImageFile(getOpenFileFilter(), 'jpg', 'open', 'Open Image File');
		if (path == null) return;

		File.Load(URL.toPath(path), panelToOpen);
	}

	render() {
		console.log('HomeFeatures render');

        const desc = this.currentDescription ?? 'Hi, what do you want to do today?';

		let arrDescriptions = this.featureButtonsInfo.map((item, index) => {

			return (
				<FeatureButton
					text={item.text}
					onClick={this.onClickFeature}
					module={item.module}
					onMouseEnter={this.showTextDescription.bind(this)}
					onMouseLeave={this.hideTextDescription}
					video={item.video}
					grayscale={item.grayscale}
					description={item.description}
				/>
			);
		});

		return (
			<div class='content'>
				<div class='buttons-descriptions'>
					<p>{desc}</p>
				</div>
				<div class='vertical-separator' />
				<div class='functional-buttons'>
					{arrDescriptions}
					{/*this.cheat*/}
				</div>
			</div>
		);
	}
}