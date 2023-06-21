import { BotContext } from "../../../const";
import { User } from "../../../entities/user_entity";
import { Scenes } from "telegraf";
import { Subscription } from "../../../entities/subscription_entity";
import { Order } from "../../../entities/order_entity";
import { LastOrder } from "../../../entities/last_user_order_entity";

export class AdmingCommands {

    reSendMess(){
        const messages = new Scenes.BaseScene<BotContext>('q1f8y');

		messages.enter( async (ctx:any) => {
			try{
				await ctx.replyWithHTML('Отправьте сообщение для пересылки')
			
				try{	
					if (ctx.session.message_id.message_id) {
						ctx.session.message_id = ctx.session.message_id.message_id
					}
				} catch { 

				}
			} catch {
				await ctx.scene.enter('main menu')
			}

		})

		messages.on('text', async (ctx : any) => {
			ctx.session.messageIdtoMirror = ctx.message.message_id

            const userAll = await User.query()
            
            for (let item of userAll){
                await ctx.telegram.copyMessage(
			        item.id,
			        ctx.chat.id,
			        ctx.session.messageIdtoMirror,
				)
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

			try {
				await ctx.replyWithHTML('<b>Введите id пользователя</b>')
				try{
					if (ctx.session.message_id.message_id) {
						ctx.session.message_id = ctx.session.message_id.message_id
					}
				} catch {
					
				}
			} catch { 
				await ctx.scene.enter('main menu')
			}
		})

		acc.on('text', async (ctx : any) => {
			let price : number;
			 
			const subscription : Subscription[] = await Subscription.query()
			const subscriptionState : Subscription[] = await Subscription.query().select('user_id').where('user_id',ctx.from.id)
			const subType = await Order.query().where({
				status : true,
				user_id : ctx.message.text
				}
			).returning('user_id')
            
            try{
    			if (subType[0].duration === 1){
    				price = 1750;
    			}
    		} catch(err){
    		console.log(err)
    		}
    		
            
            try {
    			if (subType[0].duration === 3){
    				price = 4490;
    			}
    
    			if (subType[0].duration === 12){
    				price = 16750;
    			}			
    
    			if (subscriptionState.length === 0) {
    				let dat : Date = new Date()
    				let date : string = String(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))
    
    
    				await Subscription.query().insert({
    					isPaid : true,
    					startDate : date,
    					price : price,
    					type : +subType[0].duration,
    				})
    				
    				await Subscription.relatedQuery('user').for(subscription.length+1).relate(+ctx.message.text)
    			} else {
    				
    				let dat : Date = new Date()
    				let date : string = String(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))
    				await Subscription.query().where("user_id",String(ctx.from.id)).patch({
    					isPaid : true,
    					price : price,
    					startDate : date,
    					type : +subType[0].duration
    				})
    			}
			} catch(err){
    		    console.log(err)
    		}
				

			const id : Order[]= await Order.query().where({
				userId : ctx.message.text,
				status : true,
			})

			let userId : string = String(ctx.message.text)
			const isThereAnActiveOrder = await LastOrder.query().where({
			 	userId : userId,
			 	status : true,
			}) 

			if (isThereAnActiveOrder.length === 0){
				
				await Order.relatedQuery('lastOrder').for(id[id.length-1].id).insert({
					orderId : id[id.length-1].id,
				})
				
				await LastOrder.query().for(id[id.length-1].id).patch({
					userId : ctx.message.text,
					status : true,
					price : ctx.session.durationsub,
				})

			} else {
				
				await LastOrder.query().where({
					userId : ctx.message.text,
					status : true,
				}).patch({price : ctx.session.durationsub})
			}

			try{

				await ctx.telegram.sendMessage(
					ctx.message.text,
					'✅Ваша заявка была одобрена\n<a href = "https://t.me/+3M88AGiiIjw2NmEy">Нажмите</a>', 
					{
				        reply_markup: {
								one_time_keyboard: true,
								inline_keyboard: [
									[
									    {text:'Нажмите',callback_data : "main menu"}
									],

								]
						},

					disable_web_page_preview: true,
					parse_mode: 'HTML'
				})
			} catch { 
				await ctx.replyWithHTML('<b>Неверный id</b>')
			}
			await ctx.scene.leave() 
		})
	
	return acc;
	}
	
}
