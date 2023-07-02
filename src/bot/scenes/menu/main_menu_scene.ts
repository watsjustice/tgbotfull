import { BotContext } from "../../../const";
import {Context, Scenes} from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";
import { User } from "../../../entities/user_entity";


export class MainMenuScene {

    MenuFunc(){
    
        const menu : any = new Scenes.BaseScene<BotContext>('main menu');

        menu.enter(async (ctx : any) =>{
            
            const user = await User.query().findById(ctx.from.id).returning('*')
            let dat : Date = new Date()
            let date : string = String(String(dat.getFullYear()) + '-' + '0'+String(dat.getMonth()+1) + '-' + String(dat.getDate()))
            if (!user){
                await User.query().insert({
                    id : ctx.from.id,
                    attended: date
                })
            } else {
                await User.query().patch({
                    attended : date
                })
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
                    await ctx.scene.leave()
                    ctx.session.message_id = NaN
                    await ctx.scene.enter('main menu')
                }
            }
        
        })
            
        return menu;
        }
}
