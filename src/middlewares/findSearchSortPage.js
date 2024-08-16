"use strict";

// req, res a ihtiyacimiz oldugu icin bunu middleware yapiyoruz

module.exports = async (req, res, next) => {
  const filter = req.query?.filter || {};
  const search = req.query?.search || {};
  const sort = req.query?.sort || {};

  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 10);

  let page = Number(req.query?.page);
  page = page > 0 ? page : 1;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;

  for (let key in search) search[key] = { $regex: search[key] };

  //  const data = await BlogPost.find({ ...filter, ...search })
  //    .sort(sort)
  //    .skip(skip)
  //    .limit(limit)
  //    .populate("categoryId");

  res.getModelList = async function (model, populate = null) {
    return await model
      .find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  // parametredeki populate i default olarak null yaptik her zaman kullanilmayacagi icin

  res.getModelListDetails = async function (model) {
    const data = await model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 1 ? page - 1 : false,
        current: page,
        next: page + 1,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };

    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;

    if (details.totalRecords <= limit) details.pages = false;

    return details;
  };
  next();
};

// bu middleware istedigimiz yerde kullanmak icin indexJS de bagladik
