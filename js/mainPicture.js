 window.addEventListener("DOMContentLoaded", function () {
            // 이전 페이지에서 전달받은 이미지 URL 가져오기
            const urlParams = new URLSearchParams(window.location.search);
            const imageUrl = urlParams.get("image");
            console.log(imageUrl);

            // 이미지를 배경으로 설정
            const imageContainer = document.getElementsByClassName("imagebox");
            if (imageUrl) {
              for (div of imageContainer) {
                div.style.backgroundImage = `url(${imageUrl})`;
              }
            } else {
              imageContainer.textContent = "이미지를 전달받지 못했습니다.";
            }
          });