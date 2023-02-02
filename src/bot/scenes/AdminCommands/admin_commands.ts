import { BotContext } from "src/const";
import { User } from "../../../entities/user_entity";
import { Scenes } from "telegraf";

export class AdmingCommands {

    reSendMess(){
        const messages = new Scenes.BaseScene<BotContext>('q1f8y');

		messages.enter( async (ctx:any) => {
			await ctx.replyWithHTML('Отправьте сообщение для пересылки')
		

			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
			}

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


    return messages;
    }

	AcceptTheSub(){
		const acc = new Scenes.BaseScene<BotContext>('acception');

		acc.enter(async (ctx:any) => {
			await ctx.replyWithHTML('<b>Введите id пользователя</b>')
			if (ctx.session.message_id.message_id) {
				ctx.session.message_id = ctx.session.message_id.message_id
			}
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
	
}