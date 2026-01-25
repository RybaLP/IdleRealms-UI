import { ActiveQuest } from "../quest/activeQuest"
import { Quest } from "../quest/quest"

export interface TavernStatusResponse {
    avalibleQuestOffers : Quest [],
    activeQuest : ActiveQuest 
}