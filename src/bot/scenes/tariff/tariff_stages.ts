import { samples } from "../../../bot/texts";
import { BotContext } from "../../../const";
import { Scenes } from "telegraf";
import { User } from "../../../entities/user_entity";
import { Order } from "../../../entities/order_entity";
import { Subscription } from "../../../entities/subscription_entity";
import { LastOrder } from "../../../entities/last_user_order_entity";

export class TariffStages {

    catalog() {  
        const stage = new Scenes.BaseScene<BotContext>('stage');


		stage.enter( async (ctx:any) => {

			try{

				try {
					if (ctx.session.message_id.message_id) {
						ctx.session.message_id = ctx.session.message_id.message_id
					}
				} catch {

				}

				if (!ctx.session.message_id){
					const { message_id } = await ctx.replyWithHTML(
						samples.tariffStep1,
						{
					        reply_markup: {
					            one_time_keyboard: true,
					            inline_keyboard: [
					                    
					                [{text:'✅1 месяц за 1750',callback_data: '1monthsub'}],
		                    			[{text:'✅3 месяца за 4490',callback_data: '3monthsub'}],
		                    			[{text:'✅12 месяцев за 16750',callback_data: '12monthsub'}],
							[{text: 'Назад', callback_data: 'main menu'}],

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
					                      
					                [{text:'✅1 месяц за 1750',callback_data: '1monthsub'}],
		                    			[{text:'✅3 месяца за 4490',callback_data: '3monthsub'}],
		                    			[{text:'✅12 месяцев за 16750',callback_data: '12monthsub'}],
							[{text: 'Назад', callback_data: 'main menu'}],

					            ]
					        },
					        disable_web_page_preview: true,
					        parse_mode: 'HTML'
		    			})

					ctx.session.message_id = message_id
				}

				const heigthOrders : Order[] = await Order.query()
				const subscription : Subscription[] = await Subscription.query().where("user_id",String(ctx.from.id))

				let dat : Date = new Date()
				let date : string = String(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))
				ctx.session.idsOrder = await Order.query().insertAndFetch({
					status : false,
					duration : ctx.session.durationsub,
					date : date, 
				})

				await Order.relatedQuery('user').for(heigthOrders.length+1).relate(ctx.from.id)
			} catch (err) {
				await ctx.scene.enter('main menu')

			}
		})
		
		return stage;
	}


    payment() {
        const payment = new Scenes.BaseScene<BotContext>('subpay');

		payment.enter( async (ctx : any) => {

			try{

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

					case 4: 
						text = samples.tariffSale
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
										    {text:'⚫Оплатить',callback_data: 'paymentinfo'}
										],
										[
											{text: 'Назад',callback_data: 'stages'}
										],
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
										    {text:'⚫Оплатить',callback_data: 'paymentinfo'}
										],
										[
											{text: 'Назад', callback_data: 'stages'}
										],
									]
							},
					        disable_web_page_preview: true,
					        parse_mode: 'HTML'
		    			})

					ctx.session.message_id = message_id

				} 
		} catch {
			await ctx.scene.enter('main menu')
		}
		})
		return payment;
		
    }

    access(){
        const info = new Scenes.BaseScene<BotContext>('payinfo');

		info.enter(async (ctx: any) => {

			try {
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
										[{text: 'Назад', callback_data: 'subpay'}],
								    ]
						},
				        disable_web_page_preview: true,
				        parse_mode: 'HTML'
	    			})

				ctx.session.message_id = message_id
			} catch (err) {
				await ctx.scene.enter('main menu')
			}		
		})
		return info;
	}

    billCheck() {
        const access = new Scenes.BaseScene<BotContext>('accesspayment');
		let text : string;

		access.enter(async (ctx: any) => {

			try{
				text = samples.tariffStep4
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
			} catch (err) { 
			await ctx.scene.enter('main menu')
		}
		})

		access.on('photo', async (ctx : any) => {
			try {
				await ctx.telegram.sendPhoto(
		            1177303799,
		            ctx.message.photo[ctx.message.photo.length - 1].file_id,
		            { caption : `${ctx.chat.id}\n${ctx.session.durationsub}\n@${ctx.chat.username}`}
	            )
				await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id)
				text = samples.tariffStep5
				await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)

				let ids : number =  ctx.session.idsOrder.id
				
				await Order.query().where({
					id : ids,
				}).patch({
					status : true,
					duration: ctx.session.durationsub
				})

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

			} catch {
				await ctx.scene.enter('main menu')
			}

		})


		return access;
    }
}
     

