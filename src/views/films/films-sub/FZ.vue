<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    async getReleaseFilms(type, location, year) {
      this.pagination = false;
      this.loading = false;
      const params = {
        pageSize: 18,
        pageNum: 1,
        films_type: "soon",
      };
      const { data: res1 } = await this.$req.getAllfilms(params);
      const res = res1.films.records;
      this.total = res1.films.total;
      if (type === "all" && location === "all" && year === "all") {
        this.allFilmsList = res;
      } else if (location === "all" && year === "all") {
        this.allFilmsList = res.filter(
          (v) =>
            v.type === type || v.othertype === type || v.othertypes === type
        );
        this.total = this.allFilmsList.length;
      } else if (type === "all" && year === "all") {
        this.allFilmsList = res.filter(
          (v) => v.location === location || v.location1 === location
        );
        this.total = this.allFilmsList.length;
      } else if (type === "all" && location === "all") {
        this.allFilmsList = res.filter((v) => v.year === year);
        this.total = this.allFilmsList.length;
      } else if (type === "all") {
        this.allFilmsList = res.filter(
          (v) =>
            (v.location === location || v.location1 === location) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      } else if (location === "all") {
        this.allFilmsList = res.filter(
          (v) =>
            (v.type === type ||
              v.othertype === type ||
              v.othertypes === type) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      } else if (year === "all") {
        this.allFilmsList = res.filter(
          (v) =>
            (v.location === location || v.location1 === location) &&
            (v.type === type || v.othertype === type || v.othertypes === type)
        );
        this.total = this.allFilmsList.length;
      } else {
        this.allFilmsList = res.filter(
          (v) =>
            (v.type === type ||
              v.othertype === type ||
              v.othertypes === type) &&
            (v.location === location || v.location1 === location) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      }
      if (this.allFilmsList.length > 30) {
        this.pagination = true;
        this.list = this.allFilmsList;
        this.allFilmsList = this.list.slice(0, 30);
      }
      if (this.allFilmsList.length <= 0) {
        this.loading = true;
      }
    },
    change(page) {
      const params = {
        pageSize: 18,
        pageNum: page,
        films_type: "soon",
      };
      this.$req.getAllfilms(params).then((res) => {
        this.allFilmsList = res.data.films.records;
      });
      window.scroll(0, 0);
      // this.page = page;
      // if (this.pagination) {
      //   this.allFilmsList = this.list.slice((page - 1) * 30, page * 30);
      // } else {
      //   this.$req.getReleaseFilms().then((res) => {
      //     this.total = res.total;
      //     this.allFilmsList = res.filter((v) => v.page === this.page);
      //   });
      // }
    },
  },
};
</script>


<style>
</style>