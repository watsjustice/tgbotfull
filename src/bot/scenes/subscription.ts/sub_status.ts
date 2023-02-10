import { samples } from "src/bot/texts";
import { BotContext } from "src/const";
import { User } from "../../../entities/user_entity";
import { Scenes } from "telegraf";
import { Subscription } from "../../../entities/subscription_entity";

export class SubscriptionCheck{

    subCheck(){
        const sub = new Scenes.BaseScene<BotContext>('substatus');
		sub.enter(async (ctx: any) => {
			let text: string = '';

			const validation : Subscription[] = await Subscription.query().where({
				user_id : ctx.from.id,
				is_paid : true
			})
			
			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
			}
			

			if (validation.length === 0) { 
				text = samples.subscribeStatusRejection;

			} else {
				text = samples.subscribeStatusAcception;
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
}