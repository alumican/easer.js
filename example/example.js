const animation = document.getElementById('animation');

async function serial() {
	const result = await easer.serial([

		// start
		//easer.call(() => { console.log('start')}),
		easer.call(console.log, ['start']),

		// delay
		easer.call(() => { console.log('static interval', 1000)}),
		easer.delay(1000),

		// insert task
		easer.insert(() => {
			const interval = Math.floor(Math.random() * 1000);
			console.log('dynamic interval', interval);
			return easer.delay(interval);
		}),

		// insert promise
		easer.insert(() => {
			return new Promise(resolve => {
				const interval = Math.floor(Math.random() * 1000);
				console.log('dynamic interval', interval);
				setTimeout(resolve, interval);
			});
		}),

		// parallel
		easer.call(() => { console.log('start parallel')}),
		easer.parallel([

			// waiting event
			easer.listen(window, 'click'),

			// waiting executing function
			easer.callback(complete => {
				const timerId = setInterval(() => {
					const random = Math.random();
					if (Math.random() < 0.1) {
						clearInterval(timerId);
						console.log('\tcomplete random');
						complete(random);
					}
				}, 100);
			}),

			// waiting sub sequence
			easer.serial([
				easer.call(() => { console.log('\tsub sequence start')}),
				easer.delay(500),
				easer.call(() => { console.log('\tsub sequence 1 / 3')}),
				easer.delay(500),
				easer.call(() => { console.log('\tsub sequence 2 / 3')}),
				easer.delay(500),
				easer.call(() => { console.log('\tsub sequence 3 / 3')}),
			]),
		]),

		// tween
		easer.call(() => { console.log('start tween')}),
		easer.tween(1000, easer.easing.easeInOutQuad)
			.css(animation.style, 'left', 'px', 100)
			.onUpdate(() => {
				console.log(animation.style.left);
			}),

		easer.tween(1500, easer.easing.easeOutElastic).css(animation.style, 'top', 'px', 100),
		easer.tween(1000, easer.easing.easeInSine).css(animation.style, 'left', 'px', 0),
		easer.tween(1500, easer.easing.easeOutBounce).css(animation.style, 'top', 'px', 0),

		// complete
		easer.call(() => { console.log('complete all')}),

	]).run();

	console.log(result);
}

serial();
