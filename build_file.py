import sys, json, zipfile
import shutil

data = json.loads(sys.argv[1])
src = "C:\rupesh\class_3rd_year\web application development CS353\webdevelpmentpractice\Epics-project-main\portfolio_builder\css site-1"
print("here")
des = f'C:\rupesh\class_3rd_year\web application development CS353\webdevelpmentpractice\Epics-project-main\portfolio_builder\public{data["firstName"]}_{data["lastName"]}-website'
shutil.copytree(src, des)
print("here")
html = f"""
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>{data["firstName"]} {data["lastName"]}</title>
  <link rel="stylesheet" href="css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat|Sacramento" rel="stylesheet">
  <script
      src="https://kit.fontawesome.com/c5032a45dd.js"
      crossorigin="anonymous"
    ></script>
</head>

<body>
  <div class="top-container">
    <img class="top-cloud" src="images/cloud.png" alt="cloud">
    <div class="title-text">
      <h1>I'm {data["firstName"]}.</h1>
      <h2>a {data["knownAs"]}</h2>
    </div>
    <img class="bottom-cloud" src="images/cloud.png" alt="cloud">
    <img class="mountain" src="images/mountain.png" alt="mountain-img">
  </div>

  <div class="middle-container">
    <div class="profile">
      <img src="images/{data["gender"]}.png" class="profile-img" alt="{data["gender"]}-profile-img">
      <h2 class="heading">Hello.</h2>
      <p class="intro">{data["aboutPara"]}</p>
    </div>
    <hr>
    <div class="skills">
      <h2 class="heading">My Skills</h2>
      <div class="skill-row">
        <h3 class="skill">{data["skill1"]}</h3>
        <p>{data["skill1-des"]}</p>
      </div>
"""
print("here")
for i in range(2,6):
  s=f"skill{i}"
  if s in data.keys() and data[s]!="":
    html+=f"""
    <div class="skill-row">
      <h3 class="skill">{data[s]}</h3>
      <p>{data[s+"-des"]}</p>
    </div>
    """
html+=f"""
    </div>
    <hr>
    <div class="contact-me">
      <h2 class="heading">Get In Touch</h2>
      <div class="f-row row">
        <div class="f-col col">
          <a href="{data["twitter"]}" class="link">
          <i class="fab fa-twitter"></i>
        </a>
        </div>
        <div class="f-col col">
          <a href="{data["linkedIn"]}" class="link">
            <i class="fa fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div class="f-col col">
          <a href="{data["instagram"]}" class="link">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
        <div class="f-col col">
          <a href="mailto:{data["email"]}" class="link">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  </div>


  <div class="bottom-container">
    <p class="copyright">© 2022 {data["firstName"]} {data["lastName"]}.</p>
  </div>
</body>

</html>

"""
f=open(des+"\\index.html",'w')
f.write(html)
f.close()
des1 = f'D:\\epics\\portfolio_builder\\public\\{data["firstName"]}_{data["lastName"]}-zipped-website'
shutil.make_archive(des1,'zip', des)
sys.stdout.flush()