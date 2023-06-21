import { samples } from "../../../bot/texts";
import { BotContext } from "../../../const";
import { Scenes } from "telegraf";

export class ThirdPointThings{

    information(){
        const info = new Scenes.BaseScene<BotContext>('info');

		info.enter(async (ctx : any) => {

			try {
				let text =  samples.info

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
			} catch {
				await ctx.enter('main menu')
			}

		})
		return info;
    }

    askYourQuestion(){
        const q = new Scenes.BaseScene<BotContext>('questions');

		

		q.enter(async (ctx : any) => {

			try {
				let text = samples.questions

				console.log(ctx.session.message_id, '-----------');
				
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
			} catch { 
				await ctx.scene.enter('main menu')
			}
		})
		return q;
	}
}
