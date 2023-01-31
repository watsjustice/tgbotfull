import {Context, Scenes, } from "telegraf";
import knexfile from "../knexfile.js";
import Knex from "knex";
import {User} from "../entities/user_entity.js";
import {Model} from "objection";
import { Update } from "telegraf/typings/core/types/typegram.js";
import  { samples } from '../bot/texts'
import { BotContext } from '../bot/const.js'

Model.knex(Knex(knexfile.development));
export class SceneGenerator{

	reSendMess(){
		const message : Scenes.BaseScene<Context<Update>> = new Scenes.BaseScene<BotContext>('main menu');

		message.enter(async (ctx : any) =>{
			
			const user : User = await User.query().findById(ctx.from.id).returning('*')
			
			if (!user){
				await User.query().insert({
					id : ctx.from.id,
					status : false,
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
		const stage = new Scenes.BaseScene<BotContext>('stage');

		stage.enter( async (ctx:any) => {


			if (!ctx.session.message_id){
				const { message_id } = await ctx.replyWithHTML(
					samples.tariffStep1,
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
					samples.tariffStep1,
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
		const payment = new Scenes.BaseScene<BotContext>('subpay');

		payment.enter( async (ctx : any) => {

			let text : string = '';
			switch (ctx.session.thesub){
				case 1:
					text = samples.tariffStep2Point1
					break;

				case 2:
					text = samples.tariffStep2Point2
					break;

				case 3:
					text = samples.tariffStep2Point3
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
		const info = new Scenes.BaseScene<BotContext>('payinfo');

		info.enter(async (ctx: any) => {

			let text = samples.traiffStep3

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
		const access = new Scenes.BaseScene<BotContext>('accesspayment');
		let text : string;

		access.enter(async (ctx: any) =>{
			let text =  samples.tariffStep4

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
	            { caption : `${ctx.chat.id}\n${ctx.session.durationsub} `}
            )

			await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id)

			let text = samples.tariffStep5
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
		const sub = new Scenes.BaseScene<BotContext>('substatus');
		let status = [0]
		sub.enter(async (ctx: any) => {
			let text = '';

			const user : User = await User.query().findById(ctx.chat.id).returning('status')
			

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
		const q = new Scenes.BaseScene<BotContext>('questions');

		q.enter(async (ctx:any) => {
			let text = samples.questions

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
		const info = new Scenes.BaseScene<BotContext>('info');

		info.enter(async (ctx : any) => {
			let text =  samples.info

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
		const acc = new Scenes.BaseScene<BotContext>('acception');

		acc.enter(async ctx => {
			await ctx.replyWithHTML('<b>Введите id пользователя</b>')
		})

		acc.on('text', async (ctx : any) => {


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

		const messages = new Scenes.BaseScene<BotContext>('q1f8y');

		messages.enter( async ctx => {
			await ctx.replyWithHTML('Отправьте сообщение для пересылки')
		})

		messages.on('text', async (ctx : any) => {
			ctx.session.messageId = ctx.message.message_id
			const userData = await User.query().returning('*')
			for (let item in userData){
				let dat : Date|number = new Date()
				let theDateOfTheStart : Date|number = new Date(userData[item].date)
				dat = new Date(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))

				if (+theDateOfTheStart - +dat > 24*60*60*1000*userData[item].duration*10){
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


		messages.on('photo', async (ctx : any) => {
			ctx.session.messageId = ctx.message.message_id
			const userData = await User.query().returning('*')

			for (let item in userData){
				let dat : Date = new Date()
				let theDateOfTheStart : Date = new Date(userData[item].date)
				dat = new Date(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))

				if (+theDateOfTheStart - +dat > 24*60*60*1000*userData[item].duration*10){
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
