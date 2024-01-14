from instabot import Bot

bot=Bot()
bot.login(username='',password='')

#For Following someones
try:
    bot.follow('username')

except Exception as e:
    print(f'{e}')

# Works with Reels 
url = 'https://www.instagram.com/reel/CzORFPaqGrQ/?utm_source=ig_web_copy_link'
bot.send_message(url,'<instagram_username>')

bot.logout()