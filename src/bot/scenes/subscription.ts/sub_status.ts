import { samples } from "../../../src/bot/texts";
import { BotContext } from "../../../src/const";
import { User } from "../../../entities/user_entity";
import { Scenes } from "telegraf";
import { Subscription } from "../../../entities/subscription_entity";

export class SubscriptionCheck{

    subCheck(){
        const sub = new Scenes.BaseScene<BotContext>('substatus');
		sub.enter(async (ctx: any) => {
			try {
				let text: string = '';

				try {
					if (ctx.session.message_id.message_id) {
						ctx.session.message_id = ctx.session.message_id.message_id
					}
				} catch {
					
				}

				let ids = String(ctx.from.id)
				
				const validation : Subscription[] = await Subscription.query().where({
					userId : ids,
					isPaid : "true",
				})

	            console.log(validation)
				if (validation.length === 0){
					text = samples.subscribeStatusRejection;
				}
				
				for (let item in validation){
					let dat : Date|number = new Date()
					let theDateOfTheStart : Date|number = new Date(validation[item].startDate)
					dat = new Date(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))
					
					console.log(+dat - +theDateOfTheStart, '-------');
					console.log(+theDateOfTheStart- +dat, '********');
					console.log(24*60*60*1000*validation[item].type*30)
					

					if (+dat - +theDateOfTheStart < 24*60*60*1000*validation[item].type*30){
						text = samples.subscribeStatusAcception;
						break;

					} else {
						text = samples.subscribeStatusRejection;
						await Subscription.query().findById(validation[item].id).patch({
							isPaid : false,
						})

					}


				}
				
				try {
					if (ctx.session.message_id.message_id) {
						ctx.session.message_id = ctx.session.message_id.message_id
					}
				} catch {

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
			} catch {
				await ctx.scene.enter('main menu')
			}

		})
		return sub;
	}
}
