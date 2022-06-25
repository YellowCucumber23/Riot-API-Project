import requests
import json
import time

KEY = "RGAPI-79b39184-143d-4648-95cc-0bf5f963d8fe"

# Get Challenger Players
def getChallengerData():
    URL = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" + KEY
    response = requests.get(URL)
    file = response.json()  # Get data
    summonerProfile = []
    role_dict = []
    win_dict = []
    
    # For each entry, get summoner id and add to array
    for i in range(int(len(file['entries'])/20)):          # Get challenger players
        summonerID = file['entries'][i]['summonerId']
        summonerProfile.append(summonerID)
    counter = 0
    for id in summonerProfile:                        # For each summoner, get match history
        if counter % 3 == 0:
            time.sleep(1)
        summoner = getSummonerProfile(id)
        match_history = getMatchHistory(summoner['puuid'], 5)
        for match in match_history:    # For each match in match history, get role played
            match_data = getMatchData(match)
            # print(match_data)
            nameList = match_data['metadata']['participants']
            for i in range(len(nameList)):
                if nameList[i] == summoner['puuid']:
                    role = match_data['info']['participants'][i]['teamPosition']
                    win = match_data['info']['participants'][i]['win']
                    if role == "UTILITY":
                        role = "SUPPORT"
                    role_dict.append(role)
                    win_dict.append(win)
                    print(summoner['name'], role, win)
            counter+=1
    return(role_dict, win_dict)
# Returns summoner profile by name SummonerDTO/dict
def getSummonerProfile(summonerID):
    URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/" + summonerID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns summoner profile by PUUID
def getSummonerProfilePUUID(puuid):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + puuid + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns list of match ID
def getMatchHistory(puuid, numGames):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?queue=420&start=0&count=" + str(numGames) + "&api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns matchDTO
def getMatchData(matchID):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns match timeline
def getMatchTimeline(matchID):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "timeline?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

if __name__ == "__main__":
    roles, wins = getChallengerData()
    dict = {
        "win": [],
        "lose" : []
    }
    for i in range(len(wins)):
        if wins[i] == True:
            dict['win'].append(roles[i])
        else:
            dict['lose'].append(roles[i])
    
    with open('data.json', 'w+') as f:
        json.dump(dict, f, indent = 2)