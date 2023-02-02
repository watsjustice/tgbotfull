import { samples } from "src/bot/texts";
import { BotContext } from "src/const";
import { Scenes } from "telegraf";

export class TariffStages {

    catalog() {   
        const stage = new Scenes.BaseScene<BotContext>('stage');

		stage.enter( async (ctx:any) => {

			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
			}

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
				console.log(message_id);
			}
		})

		return stage;
	}


    payment() {
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
				console.log(message_id);

			} 

									
		})

		return payment;

    }

    access(){
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
			console.log(message_id);
			
		})
		return info;
	}

    billCheck() {
        const access = new Scenes.BaseScene<BotContext>('accesspayment');
		let text : string;

		access.enter(async (ctx: any) => {
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
				console.log(message_id,'-----');
		})

		access.on('photo', async (ctx : any) => {
			await ctx.telegram.sendPhoto(
	            1177303799,
	            ctx.message.photo[ctx.message.photo.length - 1].file_id,
	            { caption : `${ctx.chat.id}\n${ctx.session.durationsub} `}
            )
			await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id)
			text = samples.tariffStep5
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
}
     

