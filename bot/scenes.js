import {Markup, Scenes, } from "telegraf";
import knexfile from "../knexfile.js";
import Knex from "knex";
import {User} from "../entities/user_entity.js";
import {Model} from "objection";

Model.knex(Knex(knexfile.development));
export class SceneGenerator{

	reSendMess(){
		const message = new Scenes.BaseScene('main menu');

		message.enter(async ctx =>{
			
			const user = await User.query().findById(ctx.from.id).returning('*')
			
			if (!user){
				await User.query().insert({
					id : ctx.from.id,
					status : 0,
				})
			}

			if (ctx.session.message_id){
			}else{ 
				ctx.session.message_id = NaN
			}

			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML('<b>Главое меню</b>',
					{
				        reply_markup: {
				            one_time_keyboard: true,
				            inline_keyboard: [
				                [
				                	{text:'💲Тарифы',callback_data: 'stages'}],
	                    			[{text:'🕛Подписка',callback_data: 'substatus'}],
	                    			[{text:'❓Вопросы',callback_data: 'questions'}],
	                    			[{text:'📌Подробнее о сервисе',callback_data: 'info'}],
				            ]
				        },
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})
				ctx.session.message_id = message_id
		
			} else {

				try{
					const { message_id } = await ctx.telegram.editMessageText(
						ctx.chat.id,
		                ctx.session.message_id,
		                0,
						'<b>Главое меню</b>',
							{
						        reply_markup: {
						            one_time_keyboard: true,
						            inline_keyboard: [
						                [
						                	{text:'💲Тарифы',callback_data: 'stages'}],
			                    			[{text:'🕛Подписка',callback_data: 'substatus'}],
			                    			[{text:'❓Вопросы',callback_data: 'questions'}],
			                    			[{text:'📌Подробнее о сервисе',callback_data: 'info'}],
						            ]

						        },
						        disable_web_page_preview: true,
						        parse_mode: 'HTML'
			    			})
						ctx.session.message_id = message_id
				

				} catch {

				}
			}
		
		})
			
		return message;
	}


	Stages(){
		const stage = new Scenes.BaseScene('stage');

		stage.enter( async ctx => {


			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					'Чтобы ознакомиться с тарифом, выберите необходимый, нажав на соответствующую кнопку',
					{
				        reply_markup: {
				            one_time_keyboard: true,
				            inline_keyboard: [
				                [
				                	{text:'✅1 месяц за 1490',callback_data: '1monthsub'}],
	                    			[{text:'✅3 месяца за 3990',callback_data: '3monthsub'}],
	                    			[{text:'✅12 месяцев за 14990',callback_data: '12monthsub'}],

				            ]
				        },
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id 
			} else { 
				const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
	                ctx.session.message_id,
	                0,
					'Чтобы ознакомиться с тарифом, выберите необходимый, нажав на соответствующую кнопку',
					{
				        reply_markup: {
				            one_time_keyboard: true,
				            inline_keyboard: [
				                [
				                	{text:'✅1 месяц за 1490',callback_data: '1monthsub'}],
	                    			[{text:'✅3 месяца за 3990',callback_data: '3monthsub'}],
	                    			[{text:'✅12 месяцев за 14990',callback_data: '12monthsub'}],

				            ]
				        },
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id 

			}
		})

		return stage;
	}


	subPayment(){
		const payment = new Scenes.BaseScene('subpay');

		payment.enter( async ctx => {

			let text;
			switch (ctx.session.thesub){
				case 1:
					text = 'Тариф: 🔐 1 месяц за 1490₽ 🎟️'+ '\n' +
										'Стоимость: 10.00 🇷🇺RUB' + '\n'+
										'Срок действия: 31 дней'
					break;

				case 2:
					text = 'Тариф: 🔐 3 месяц за 3990₽ 🎟️'+ '\n' +
										'Стоимость: 10.00 🇷🇺RUB' + '\n'+
										'Срок действия: 31 дней'
					break;

				case 3:
					text = 'Тариф: 🔐 12 месяцtd за 14490₽ 🎟️'+ '\n' +
										'Стоимость: 10.00 🇷🇺RUB' + '\n'+
										'Срок действия: 31 дней'
					break;


			}

			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'💵Оплатить',callback_data: 'paymentinfo'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			} else {
				const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
	                ctx.session.message_id,
	                0,
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'💵Оплатить',callback_data: 'paymentinfo'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id

			} 

									
		})

		return payment;


	}

	paymentInfo(){
		const info = new Scenes.BaseScene('payinfo');

		info.enter(async ctx => {

			let text = 'Способ оплаты: Тинькофф/Сбер/Альфа' + '\n' +
						'К оплате: 10.00 🇷🇺RUB' + '\n' +
						`Ваш ID: ${ctx.chat.id}` + '\n' + 
						'Реквизиты для оплаты:' + '\n\n' +
						'⚠️Перевод согласно тарифу который выбрали:' + '\n' +
						'💚1 месяц - 1.490' + '\n' + 
						'💚3 месяца - 3.990' + '\n' +
						'💚1 год - 14.990' + '\n' +
						'----------------------------------' + '\n' +
						'Номер карты для перевода:' + '\n' +
						'💳4890494776467862(🥝QIWI) ✅' + '\n' +
						'----------------------------------' + '\n' +
						'ПЕРЕВОД НА СБЕР и ТИНЬКОФФ ДОСТУПЕН ТОЛЬКО ДЛЯ СТАРЫХ ПОЛЬЗОВАТЕЛЕЙ' + '\n' +
						'(❗КТО РАНЕЕ  БРАЛ ПОДПИСКУ❗)' + '\n' +
						'----------------------------------' + '\n' +
						'⚠️Все переводы проверяются в ручную админом ⚠️' + '\n' +
						'🔐Оплатив не забудьте прикрепить чек боту. ' + '\n' +
						'По всем вопросам:' + '\n\n' +
						'☎️ @KO_PRIORITYHELPER_BOT' + '\n' +
						'__________________________' + '\n'




			const { message_id } = await ctx.telegram.editMessageText(
				ctx.chat.id,
                ctx.session.message_id,
                0,
				text,
				{
			        reply_markup: {
							one_time_keyboard: true,
							inline_keyboard: [
								[
								    {text:'✅Я оплатил',callback_data: 'accesspayment'}],
							    ]
					},
			        disable_web_page_preview: true,
			        parse_mode: 'HTML'
    			})

			ctx.session.message_id = message_id
			
		})
		return info;
	}

	AccessPayment(){
		const access = new Scenes.BaseScene('accesspayment');
		let text;

		access.enter(async ctx =>{
			let text =  '💁🏻‍♂️ <b>Оплатили?</b>' + '\n\n' +
						'👌🏻 Тогда отправьте сюда картинкой (не документом!) квитанцию платежа: скриншот или фото.' + '\n\n' +
						'На квитанции должны быть четко видны: дата, время и сумма платежа.' + '\n' +
						'__________________________' + '\n' +
						'<b>За спам вы можете быть заблокированы!</b>'

			const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
	                ctx.session.message_id,
	                0,
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'❌Отмена',callback_data: 'main menu'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
				
			})

		access.on('photo', async ctx => {
			await ctx.telegram.sendPhoto(
	            1177303799,
	            ctx.message.photo[ctx.message.photo.length - 1].file_id,
	            { caption : `${ctx.chat.id}\n${ctx.session.subduration} `}
            )

			await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id)

			let text = '✅ Квитанция отправлена оператору!' + '\n\n' +
				   'Как только мы проверим платёж - у Вас активируется подписка! Ожидайте ;)'
			await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)

			const { message_id } = await ctx.replyWithHTML(
				text,
				{
			        reply_markup: {
							one_time_keyboard: true,
							inline_keyboard: [
								[
								    {text:'Главное меню',callback_data: 'main menu'}],
							    ]
					},
			        disable_web_page_preview: true,
			        parse_mode: 'HTML'
    			})

			ctx.session.message_id = message_id

		})


		return access;

	}

	subStatus(){
		const sub = new Scenes.BaseScene('substatus');
		let status = [0]
		sub.enter(async ctx => {
			try{
				let user = fs.readFileSync('userdata.json')
				let status = JSON.parse(user)
			} catch {
			}
			let text = '';

			if (Object.values(...status).includes(`${ctx.chat.id}`)){
				text = '✅Ваша подписка активна'

			} else {
				text =  '⌛️ У Вас нет действующей подписки.' + '\n\n' +
							'Ознакомьтесь с тарифами, нажав на соответствующую кнопку.'
			}

			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
										{text:'💲Тарифы',callback_data: 'subpay'}],
									    [{text:'Назад',callback_data: 'main menu'}],
								    ]
								
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			} else { 
				const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
		            ctx.session.message_id,
		            0,
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
										{text:'💲Тарифы',callback_data: 'subpay'}],
									    [{text:'Назад',callback_data: 'main menu'}],
								    ]
								
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			}

		})
		return sub;
	}

	remoteQuestions(){
		const q = new Scenes.BaseScene('questions');

		q.enter(async ctx => {
			let text =  '⚙️По всем вопросам:' + '\n' +
						'@KO_PriorityHelper_Bot'

			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'Назад',callback_data: 'main menu'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			} else {
				const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
		            ctx.session.message_id,
		            0,

					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'Назад',callback_data: 'main menu'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			}

		})
		return q;
	}


	infoAbout(){
		const info = new Scenes.BaseScene('info');

		info.enter(async ctx => {
			let text =  '🟢 С помощью сервиса Вам полноценно (благодаря автопересылке, без задержки) будут доступны идеи и сигналы сразу из 20+ каналов' +'\n\n' +
						'ℹ️Полный список каналов вы можете узнать тут: https://teletype.in/@ko_priority/list' +'\n\n' +
						'©️Мы постоянно ищем новые каналы и оставляем у себя в подборке лучших из лучших, удаляя тех, кто не эффективен'

			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'Назад',callback_data: 'main menu'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			} else {
				const { message_id } = await ctx.telegram.editMessageText(
					ctx.chat.id,
		            ctx.session.message_id,
		            0,
					text,
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'Назад',callback_data: 'main menu'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})
			}

		})
		return info;
	}

	AcceptTheSub(){
		const acc = new Scenes.BaseScene('acception');

		acc.enter(async ctx => {
			await ctx.replyWithHTML('<b>Введите id пользователя</b>')
		})

		acc.on('text', async ctx => {


			try{

				await User.query().findById(ctx.message.text).patch({
					status : true,
				})

				await ctx.telegram.sendMessage(ctx.message.text, '✅Ваша заявка была одобрена', {
					disable_web_page_preview: true,
					parse_mode: 'HTML'
				})
			} catch { 
				await ctx.replyWithHTML('<b>Неверный id</b>')
			}
			let date = new Date()
			await User.query().findById(ctx.message.text).patch({
				date : String(date.getFullYear()) + '-' + '0'+ String(date.getMonth()+1) + '-' + String(date.getDate()),
				duration : ctx.session.durationsub,
			})

			await ctx.scene.leave() 
		})



		return acc;

	}

	ReSendAction(){

		const messages = new Scenes.BaseScene('q1f8y');
		let userData;

		messages.enter( async ctx => {
			await ctx.replyWithHTML('Отправьте сообщение для пересылки')
		})

		messages.on('text', async ctx => {
			ctx.session.messageId = ctx.message.message_id
			const userData = await User.query().returning('*')
			for (let item in userData){
				let dat = new Date()
				dat = String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate())
				if (new Date(userData[item].date) - new Date(dat) > 24*60*60*1000*userData[item].duration*10){
					ctx.telegram.sendMessage(userData[item].id,
						'Ваша подписка истекла.'
						)
				} else {
			        ctx.telegram.copyMessage(
			        	userData[item].id,
			        	ctx.chat.id,
			        	ctx.session.messageId
					)
				}
			}
			await ctx.scene.leave()
 
		});


		messages.on('photo', async ctx => {
			ctx.session.messageId = ctx.message.message_id
			const userData = await User.query().returning('*')
			for (let item in userData){
				let dat = new Date()
				dat = String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate())
				if (new Date(userData[item].date) - new Date(dat) > 24*60*60*1000*userData[item].duration){
					ctx.telegram.sendMessage(userData[item].id,
						'Ваша подписка истекла.'
						)
				} else {
			        ctx.telegram.copyMessage(
			        	userData[item].id,
			        	ctx.chat.id,
			        	ctx.session.messageId
					)
				}
			}

			await ctx.scene.leave()
 
		})


    return messages
    }
}
