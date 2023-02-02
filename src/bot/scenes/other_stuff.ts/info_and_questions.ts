import { samples } from "src/bot/texts";
import { BotContext } from "src/const";
import { Scenes } from "telegraf";

export class ThirdPointThings{

    information(){
        const info = new Scenes.BaseScene<BotContext>('info');

		info.enter(async (ctx : any) => {
			let text =  samples.info

			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
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

		})
		return info;
    }

    askYourQuestion(){
        const q = new Scenes.BaseScene<BotContext>('questions');

		

		q.enter(async (ctx : any) => {
			let text = samples.questions

			console.log(ctx.session.message_id, '-----------');
			
			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
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

		})
		return q;
	}
}