(function () {
    let submitBtn = document.getElementById('submit'),
        arrayOfObjects = [];
    setUpEventListener();
    submitBtn.addEventListener('click', function () {
        let inputWord = document.getElementById('searcher'),
            url = 'https://api.themoviedb.org/3/search/movie?api_key=3e9c711ebc7c13d5b3078979c12ee0ca&language=en-US&query=' + inputWord.value + '&include_adult=false';
        createAJAXRequest(url);
    });

    function createAJAXRequest(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                parseJSON(JSON.parse(xhr.responseText).results);
            } else {
                console.error(`ready state is -> ${xhr.readyState}, status is  --> ${xhr.status}`);
            }
        };
    }

    function parseJSON(jsonArray) {
        arrayOfObjects = jsonArray;
        cleanTable();
        for (let object in arrayOfObjects) {
            drawObject(arrayOfObjects[object]);
        }
    }

    function drawObject(obj) {
        let movieInfoEntity = {
            id: obj.id,
            title: obj.title,
            language: obj.original_language,
            popularityIndex: obj.popularity,
            votes_count: obj.vote_count,
            rating: obj.vote_average,
            release_date: obj.release_date
        };

        let trEl = document.createElement('tr'),
            tdEl_id = document.createElement('td'),
            tdEl_title = document.createElement('td'),
            tdEl_language = document.createElement('td'),
            tdEl_popularityIndex = document.createElement('td'),
            tdEl_votes_count = document.createElement('td'),
            tdEl_rating = document.createElement('td'),
            tdEl_release_date = document.createElement('td');

        tdEl_id.innerHTML = movieInfoEntity.id;
        tdEl_title.innerHTML = movieInfoEntity.title;
        tdEl_language.innerHTML = movieInfoEntity.language;
        tdEl_popularityIndex.innerHTML = movieInfoEntity.popularityIndex;
        tdEl_votes_count.innerHTML = movieInfoEntity.votes_count;
        tdEl_rating.innerHTML = movieInfoEntity.rating;
        tdEl_release_date.innerHTML = movieInfoEntity.release_date;

        trEl.appendChild(tdEl_id);
        trEl.appendChild(tdEl_title);
        trEl.appendChild(tdEl_language);
        trEl.appendChild(tdEl_popularityIndex);
        trEl.appendChild(tdEl_votes_count);
        trEl.appendChild(tdEl_rating);
        trEl.appendChild(tdEl_release_date);

        document.getElementsByTagName('tbody')[0].appendChild(trEl);
    }

    function setUpEventListener() {
        let tableEl = document.querySelector('table');
        tableEl.addEventListener('click', function (event) {
            let eventClicked = event.target;
            switch (eventClicked.id) {
                case ('table_head_id'):
                    sortByAttr(arrayOfObjects, 'id', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                case ('table_head_title'):
                    sortByAttr(arrayOfObjects, 'title', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                case ('table_head_popularityIndex'):
                    sortByAttr(arrayOfObjects, 'popularity', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                case ('table_head_votes'):
                    sortByAttr(arrayOfObjects, 'vote_count', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                case ('table_head_rating'):
                    sortByAttr(arrayOfObjects, 'vote_average', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                case ('table_head_releaseDate'):
                    sortByAttr(arrayOfObjects, 'release_date', eventClicked);
                    parseJSON(arrayOfObjects);
                    break;
                default:
                    console.log(`${eventClicked.tagName} is unsortable; => clickni na to wo sortable`);
            }
        })
    }

    function sortByAttr(arr, attribute, element) {
        if (element.classList.toggle('headerSortDown')) {
            element.classList.remove('headerSortUp');
            arr.sort((a, b) => {
                if (a[attribute] > b[attribute]) {
                    return 1;
                } else if (a[attribute] < b[attribute]) {
                    return -1;
                } else {
                    return 0;
                }
            });
        } else {
            element.classList.add('headerSortUp');
            arr.sort((a, b) => {
                if (b[attribute] > a[attribute]) {
                    return 1;
                } else if (b[attribute] < a[attribute]) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
    }

    function cleanTable() {
        document.getElementsByTagName('tbody')[0].innerHTML = '';
    }
})();
