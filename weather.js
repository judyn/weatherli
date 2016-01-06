
var numSkycons = 0;
var iconArray = {};

function GetSkycon(weathercode)
{
	var id = '';
	
  switch (Number(weathercode)) {
    case 0: // tornado
        return '<i class="wi wi-day-lightning"></i>';
        break;
    case 1: // tropical storm
	case 2: // hurricane	
	case 5: // mixed rain and snow			
	case 6: // mixed rain and sleet
    case 7: // mixed snow and sleet
    case 8: // freezing drizzle
    case 9: // drizzle	
		id = "clear-night";        
        break;    
	case 18: // sleet			
    case 10: // freezing rain
		id = "sleet";        
        break;    
    case 11: // showers   
    case 12: // showers
		id = "rain";        
        break;    
    case 13: // snow flurries  
    case 14: // light snow showers
    case 15: // blowing snow
    case 16: // snow
	case 17: // hail		
		id = "snow";        
        break;    
    case 19: // dust
    case 20: // foggy
		id = "fog";        	
        break;
    case 21: // haze
    case 22: //smoky
		id = "clear-night";        
        break;  
    case 23: // blustery
    case 24: // windy
		id = "wind";        
        break;  
    case 25: // cold
    case 26: // cloudy
		id = 'cloudy';
        break;
    case 27: // mostly cloudy (night)
		id = 'partly-cloudy-night';
        break;
    case 28: // mostly cloudy (day)
		id = 'partly-cloudy-day';
        break;	
    case 29: // partly cloudy (night)
		id = 'partly-cloudy-night';
        break;
    case 30: // partly cloudy (day)
        id = 'partly-cloudy-day';
        break;
    case 31: // clear (night)
        id = 'clear-night';
        break;
    case 32: // sunny
		id = 'clear-day';
        break;
    case 33: // fair (night)
        id = 'clear-night';
        break;
    case 34: // fair (day)
    case 36: // hot	
		id = 'clear-day';
        break;
    case 40: // scattered showers
		id = 'rain';
        break;
    case 41: // heavy snow
    case 42: // scattered snow showers     
    case 43: // heavy snow
		id = 'snow';	
        break;     
    case 44: // partly cloudy
        id = 'partly-cloudy-day';
        break;         
    default:
        id = 'clear-night';
  }
  
  if (id != '')
  {
	numSkycons++;
	var canvasID = 'skycon'+numSkycons;
	iconArray[canvasID] = id;

	return '<figure class="icons"><canvas id="' + canvasID + '" width="64" height="64"></canvas></figure>';
  }
  else
  {  
	return id;
  }
  
}

$(document).ready(function() {
  //loadWeather('Seattle',''); //@params location, woeid
    navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

// Docs at http://simpleweatherjs.com
function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {

      html = '';
      html += ' <div class="city">'+weather.city+','+weather.region+'</div>';
      html += ' <table class="table">';
      html += '  <thead>';
      html += '    <th colspan="2">';
      html += '     <div class="currently">'+GetSkycon(weather.code)+weather.temp+'&deg;'+weather.units.temp+'</th></div>';
      html += '   <div class="current-cond">';
      html += '<th colspan="2">';
      html += '         <ul class="list-unstyled">';
      html += '           <li style="font-size: 20px">'+weather.currently+'</li>';
      html += '           <li style="font-size: 20px">Hi: '+weather.high+'&deg;'+weather.units.temp+'</li>';
      html += '           <li style="font-size: 20px">Lo: '+weather.low+'&deg;'+weather.units.temp+'</li>';
      html += '         </ul>';
      html += '       </th>';
      html += '     </div>';
      html += '   </thead>';
      html += '   </tr>';

html += '   <tr>';      
      for(var i=1;i<weather.forecast.length;i++) 
      {  
        html+='<td>'+weather.forecast[i].date+'</td>';
        //html += '<td>'+weather.forecast[i].day+'</td>: High:'+weather.forecast[i].high+' Low: ' + weather.forecast[i].low +'</td>';
      }
      html += '   </tr>';
      html += '   <tr>';      
      for(var i=1;i<weather.forecast.length;i++) 
      {  
        html+='<td>'+GetSkycon(weather.forecast[i].code)+weather.forecast[i].day+'</td>';
        //html += '<td>'+weather.forecast[i].day+'</td>: High:'+weather.forecast[i].high+' Low: ' + weather.forecast[i].low +'</td>';
      }
      html += '   </tr>';
      html += '   <tr>';      
      for(var i=1;i<weather.forecast.length;i++) 
      {
        html+='<td>Hi: '+weather.forecast[i].high+'&deg;</td>';
        
        //html += '<td>'+weather.forecast[i].day+'</td>: High:'+weather.forecast[i].high+' Low: ' + weather.forecast[i].low +'</td>';
      }
      html += '   </tr>';
            html += '   <tr>';      
      for(var i=1;i<weather.forecast.length;i++) 
      {
        
        html+='<td>Lo: '+weather.forecast[i].low+'&deg;</td>';
        //html += '<td>'+weather.forecast[i].day+'</td>: High:'+weather.forecast[i].high+' Low: ' + weather.forecast[i].low +'</td>';
      }
      html += '   </tr>';
      html += ' </table>';

      $("#weather").html(html);




      var icons = new Skycons({"color": "white"}),
          list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],
          i;

      for(i = list.length; i--; )
        icons.set(list[i], list[i]);

		for(var key in iconArray)
		{
			if(iconArray.hasOwnProperty(key))
			{
				icons.set(key, iconArray[key]);
				//keys.push(key);
			}
		}
	
      icons.play();
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
