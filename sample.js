const fs = require("fs");
const csv = require("csv");

fs.createReadStream("./test.csv").pipe(
	csv.parse({ columns: true }, function (err, data) {
		const keysname = Object.keys(data[0]);

		const Array = [];
		const instaceLists = [
			{
				undefinedtest1: "instace1",
				test2: "instace2",
			},
		];
		for (let i = 0; i < keysname.length; i++) {
			const keyname = data.map((item) => {
				return item[keysname[i]];
			});

			const aryMax = (a, b) => {
				return Math.max(a, b);
			};

			const aryMin = (a, b) => {
				return Math.min(a, b);
			};

			const aryAve = keyname.map(Number).reduce(function (sum, element) {
				return sum + element;
			}, 0);

			const maxvalue = keyname.map(Number).reduce(aryMax);
			const minvalue = keyname.map(Number).reduce(aryMin);
			let ob = {
				max: maxvalue,
				avrage: aryAve / keyname.length,
				min: minvalue,
				sum: aryAve,
			};
			if (instaceLists[0][keysname[i]]) {
				const lastname = instaceLists[0][keysname[i]];
				ob = { name: lastname, ...ob };
				Array.push(ob);
				continue;
			}
			const lastname = keysname[i];
			ob = { name: lastname, ...ob };

			Array.push(ob);
		}

		console.table(Array);
	})
);
